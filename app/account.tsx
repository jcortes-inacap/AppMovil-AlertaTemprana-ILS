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
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

export default function Account() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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
        <Text style={styles.sectionTitle}>Perfil de usuario</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Profile Picture and Basic Info */}
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Ionicons name="person" size={50} color="#666" />
            </View>
            <View style={styles.profileBasicInfo}>
              <Text style={styles.profileName}>Johanna Doe</Text>
              <Text style={styles.profileEmail}>johanna@company.com</Text>
            </View>
          </View>

          {/* Profile Details */}
          <View style={styles.profileDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="home" size={20} color="#666" />
              <Text style={styles.detailText}>
                Condominio: Condominio Flores Azules
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="person-circle" size={20} color="#666" />
              <Text style={styles.detailText}>Tipo de usuario: Residente</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="call" size={20} color="#666" />
              <Text style={styles.detailText}>+56912345678</Text>
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log("Edit profile")}
          >
            <Text style={styles.editButtonText}>Editar datos personales</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  profileCard: {
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileBasicInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },
  profileDetails: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  editButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
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
