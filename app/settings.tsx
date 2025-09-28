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
  Switch,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

export default function Settings() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Español");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const slideAnim = useRef(new Animated.Value(-300)).current;

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

  const languageOptions = ["Español", "English", "Português", "Français"];

  const handleUpdatePassword = () => {
    console.log("Updating password:", { currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleLogout = () => {
    console.log("Logging out");
    router.replace("/");
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
        <Text style={styles.sectionTitle}>Configuración</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Change Password Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cambiar contraseña</Text>

          <TextInput
            style={styles.input}
            placeholder="Contraseña actual"
            placeholderTextColor="#999"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.updatePasswordButton}
            onPress={handleUpdatePassword}
          >
            <Text style={styles.updatePasswordButtonText}>
              Actualizar contraseña
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Activar notificaciones</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: "#e74c3c" }}
              thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Language Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Idioma</Text>

          <TouchableOpacity
            style={styles.languageDropdown}
            onPress={() => setIsLanguageModalVisible(true)}
          >
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={isLanguageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Seleccionar idioma</Text>
            {languageOptions.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.modalOption,
                  selectedLanguage === language && styles.selectedModalOption,
                ]}
                onPress={() => {
                  setSelectedLanguage(language);
                  setIsLanguageModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedLanguage === language &&
                      styles.selectedModalOptionText,
                  ]}
                >
                  {language}
                </Text>
                {selectedLanguage === language && (
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
    textDecorationLine: "underline",
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
  sectionContainer: {
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
  updatePasswordButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  updatePasswordButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  languageDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  languageText: {
    fontSize: 16,
    color: "#333",
  },
  logoutSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "600",
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
