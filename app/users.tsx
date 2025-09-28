import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Animated,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

export default function Users() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isCondominiumModalVisible, setIsCondominiumModalVisible] =
    useState(false);
  const [selectedRole, setSelectedRole] = useState("Residente");
  const [selectedCondominium, setSelectedCondominium] = useState(
    "Condominio Flores Azules"
  );
  const slideAnim = useRef(new Animated.Value(-300)).current;

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isSidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSidebarVisible]);

  const menuItems = [
    { id: "alerts", name: "Alertas", icon: "notifications" },
    { id: "condominiums", name: "Condominios", icon: "home" },
    { id: "users", name: "Usuarios", icon: "person" },
    { id: "contracts", name: "Contratos", icon: "document-text" },
    { id: "contacts", name: "Contactos", icon: "people" },
    { id: "account", name: "Cuenta", icon: "person-circle" },
  ];

  const roleOptions = ["Residente", "Administrador", "Vigilante", "Conserje"];

  const condominiumOptions = [
    "Condominio Flores Azules",
    "Condominio Los Pinos",
    "Condominio San José",
    "Condominio El Roble",
  ];

  const existingUsers = [
    {
      id: 1,
      name: "Juan Pérez",
      role: "Residente",
      roleColor: "#6c757d",
    },
    {
      id: 2,
      name: "Ana Gómez",
      role: "Administrador",
      roleColor: "#495057",
    },
  ];

  const handleAddUser = () => {
    console.log("Adding user:", {
      firstName,
      lastName,
      email,
      phone,
      role: selectedRole,
      condominium: selectedCondominium,
    });
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            console.log("Hamburger pressed");
            setIsSidebarVisible(true);
          }}
        >
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Condominio Seguro</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Secondary Header */}
      <View style={styles.secondaryHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.backText}>Volver</Text>
      </View>

      {/* Section Title */}
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Usuarios</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add User Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Role Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsRoleModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedRole}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Condominium Dropdown */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsCondominiumModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedCondominium}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Add User Button */}
          <TouchableOpacity
            style={styles.addUserButton}
            onPress={handleAddUser}
          >
            <Text style={styles.addUserButtonText}>Agregar usuario</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Users List */}
        <View style={styles.usersList}>
          {existingUsers.map((user) => (
            <View key={user.id} style={styles.userItem}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <View
                  style={[styles.roleTag, { backgroundColor: user.roleColor }]}
                >
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Role Selection Modal */}
      <Modal
        visible={isRoleModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsRoleModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar rol</Text>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.modalOption,
                  selectedRole === role && styles.selectedModalOption,
                ]}
                onPress={() => {
                  setSelectedRole(role);
                  setIsRoleModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedRole === role && styles.selectedModalOptionText,
                  ]}
                >
                  {role}
                </Text>
                {selectedRole === role && (
                  <Ionicons name="checkmark" size={20} color="#e74c3c" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Condominium Selection Modal */}
      <Modal
        visible={isCondominiumModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCondominiumModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar condominio</Text>
            {condominiumOptions.map((condominium) => (
              <TouchableOpacity
                key={condominium}
                style={[
                  styles.modalOption,
                  selectedCondominium === condominium &&
                    styles.selectedModalOption,
                ]}
                onPress={() => {
                  setSelectedCondominium(condominium);
                  setIsCondominiumModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedCondominium === condominium &&
                      styles.selectedModalOptionText,
                  ]}
                >
                  {condominium}
                </Text>
                {selectedCondominium === condominium && (
                  <Ionicons name="checkmark" size={20} color="#e74c3c" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Sidebar */}
      <Modal
        visible={isSidebarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsSidebarVisible(false)}
      >
        <View style={styles.sidebarOverlay}>
          <TouchableOpacity
            style={styles.sidebarBackdrop}
            onPress={() => setIsSidebarVisible(false)}
          />
          <Animated.View
            style={[
              styles.sidebarContainer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Sidebar Header */}
            <View style={styles.sidebarHeader}>
              <View style={styles.profileSection}>
                <View style={styles.profileImage}>
                  <Ionicons name="person" size={40} color="#666" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Johanna Doe</Text>
                  <Text style={styles.profileEmail}>johanna@company.com</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsSidebarVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => {
                    if (item.id === "alerts") {
                      router.push("/alerts");
                    } else if (item.id === "users") {
                      router.push("/users");
                    } else if (item.id === "condominiums") {
                      router.push("/condominiums");
                    } else if (item.id === "account") {
                      router.push("/account");
                    } else if (item.id === "contacts") {
                      router.push("/contacts");
                    } else if (item.id === "contracts") {
                      router.push("/contracts");
                    }
                    console.log(`Navigate to ${item.name}`);
                    setIsSidebarVisible(false);
                  }}
                >
                  <Ionicons name={item.icon as any} size={20} color="#333" />
                  <Text style={styles.menuItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Settings Link */}
            <TouchableOpacity
              style={styles.settingsLink}
              onPress={() => {
                router.push("/settings");
                setIsSidebarVisible(false);
              }}
            >
              <Text style={styles.settingsText}>Configuración</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 15 : 15,
  },
  menuButton: {
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  headerSpacer: {
    width: 34,
  },
  secondaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  backText: {
    fontSize: 16,
    color: "#333",
  },
  sectionTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  addUserButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  addUserButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  usersList: {
    marginTop: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 15,
  },
  roleTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "500",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedModalOption: {
    backgroundColor: "#fff5f5",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedModalOptionText: {
    color: "#e74c3c",
    fontWeight: "600",
  },
  // Sidebar styles
  sidebarOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebarContainer: {
    width: "70%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    padding: 5,
  },
  menuItems: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  settingsLink: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  settingsText: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "underline",
  },
});
