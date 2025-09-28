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
  TextInput,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [alarmTitle, setAlarmTitle] = useState("");
  const [alarmDescription, setAlarmDescription] = useState("");
  const [selectedAlarmType, setSelectedAlarmType] = useState("");
  const slideAnim = useRef(new Animated.Value(-300)).current; // Inicia fuera de la pantalla

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

  const alarmTypes = [
    { id: "custom", name: "Alerta Personalizada", color: "#9b59b6" },
    { id: "minimal", name: "Peligro Mínimo", color: "#3498db" },
    { id: "low", name: "Peligro Bajo", color: "#27ae60" },
    { id: "moderate", name: "Peligro Moderado", color: "#f39c12" },
    { id: "high", name: "Peligro Alto", color: "#e67e22" },
    { id: "maximum", name: "Peligro Máximo", color: "#e74c3c" },
  ];

  const alarms = [
    {
      id: 1,
      title: "Intento de robo",
      description: "Se reporta intento de robo en Calle 123",
      time: "14:31",
      level: "Peligro Moderado",
      color: "#f39c12",
      icon: "warning" as const,
    },
    {
      id: 2,
      title: "Persona sospechosa",
      description: "Persona merodeando cerca de la entrada",
      time: "13:10",
      level: "Peligro Bajo",
      color: "#27ae60",
      icon: "warning" as const,
    },
    {
      id: 3,
      title: "Mascota perdida",
      description: 'Se busca perro pequeño, responde a "Luna"',
      time: "12:00",
      level: "Peligro Mínimo",
      color: "#3498db",
      icon: "warning" as const,
    },
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
          onPress={() => setIsSidebarVisible(true)}
        >
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Condominio Seguro</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Condominio Title */}
        <Text style={styles.condominioTitle}>
          Mi condominio: Condominio Flores Azules
        </Text>

        {/* Alarms Section */}
        <Text style={styles.alarmsTitle}>Alarmas recientes cerca de ti</Text>

        {/* Alarms List */}
        <View style={styles.alarmsList}>
          {alarms.map((alarm) => (
            <View
              key={alarm.id}
              style={[styles.alarmCard, { borderLeftColor: alarm.color }]}
            >
              <View style={styles.alarmHeader}>
                <View style={styles.alarmIconContainer}>
                  <Ionicons name={alarm.icon} size={20} color={alarm.color} />
                </View>
                <Text style={styles.alarmTime}>{alarm.time}</Text>
              </View>

              <Text style={styles.alarmTitle}>{alarm.title}</Text>

              <View
                style={[styles.alarmLevel, { backgroundColor: alarm.color }]}
              >
                <Text style={styles.alarmLevelText}>{alarm.level}</Text>
              </View>

              <Text style={styles.alarmDescription}>{alarm.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Emergency Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => setIsEmergencyModalVisible(true)}
      >
        <Ionicons name="alert-circle" size={24} color="#fff" />
        <Text style={styles.emergencyButtonText}>Emergencia</Text>
      </TouchableOpacity>

      {/* Emergency Modal */}
      <Modal
        visible={isEmergencyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEmergencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Emitir alarma de emergencia</Text>

            {/* Title Input */}
            <TextInput
              style={styles.modalInput}
              placeholder="Título de la alarma"
              placeholderTextColor="#999"
              value={alarmTitle}
              onChangeText={setAlarmTitle}
            />

            {/* Description Input */}
            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Descripción..."
              placeholderTextColor="#999"
              value={alarmDescription}
              onChangeText={setAlarmDescription}
              multiline
              numberOfLines={3}
            />

            {/* Alarm Types */}
            <Text style={styles.alarmTypeTitle}>Tipo de alarma</Text>
            <View style={styles.alarmTypesGrid}>
              {alarmTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.alarmTypeButton,
                    { backgroundColor: type.color },
                    selectedAlarmType === type.id && styles.selectedAlarmType,
                  ]}
                  onPress={() => setSelectedAlarmType(type.id)}
                >
                  <Ionicons name="warning" size={16} color="#fff" />
                  <Text style={styles.alarmTypeText}>{type.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEmergencyModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.issueButton}
                onPress={() => {
                  // Handle alarm issue
                  console.log("Alarm issued:", {
                    alarmTitle,
                    alarmDescription,
                    selectedAlarmType,
                  });
                  setIsEmergencyModalVisible(false);
                }}
              >
                <Text style={styles.issueButtonText}>Emitir alarma</Text>
              </TouchableOpacity>
            </View>
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
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  condominioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  alarmsTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  alarmsList: {
    paddingBottom: 100, // Space for emergency button
  },
  alarmCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alarmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  alarmIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  alarmTime: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  alarmTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  alarmLevel: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  alarmLevelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  alarmDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  emergencyButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  emergencyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: "top",
  },
  alarmTypeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  alarmTypesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  alarmTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
    width: "48%",
    justifyContent: "center",
  },
  selectedAlarmType: {
    borderWidth: 2,
    borderColor: "#333",
  },
  alarmTypeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  issueButton: {
    flex: 1,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  issueButtonText: {
    color: "#fff",
    fontSize: 16,
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
