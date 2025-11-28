import TabsFooter from "@/components/TabsFooter";
import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const { theme } = useAppContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Apenas estático, não faz nada
  };

  const handleNavigateToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Logo/Title Section */}
          <View style={styles.header}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: theme.primary },
              ]}
            >
              <MaterialIcons
                name="person-add"
                size={48}
                color={theme.buttonText}
              />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>
              Criar conta
            </Text>
            <Text style={[styles.subtitle, { color: theme.inputPlaceholder }]}>
              Preencha os dados para começar
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                Nome completo
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              >
                <MaterialIcons
                  name="person"
                  size={20}
                  color={theme.inputPlaceholder}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="Seu nome completo"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                E-mail
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              >
                <MaterialIcons
                  name="email"
                  size={20}
                  color={theme.inputPlaceholder}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="seu@email.com"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                Senha
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              >
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={theme.inputPlaceholder}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={theme.inputPlaceholder}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme.text }]}>
                Confirmar senha
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              >
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={theme.inputPlaceholder}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: theme.inputText }]}
                  placeholder="••••••••"
                  placeholderTextColor={theme.inputPlaceholder}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={theme.inputPlaceholder}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              activeOpacity={0.8}
              style={[
                styles.registerButton,
                {
                  backgroundColor: theme.buttonBackground,
                  borderRadius: stylesRoot.radius.m,
                },
              ]}
            >
              <Text style={[styles.registerButtonText, { color: theme.buttonText }]}>
                Criar conta
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View
                style={[styles.divider, { backgroundColor: theme.inputBorder }]}
              />
              <Text style={[styles.dividerText, { color: theme.inputPlaceholder }]}>
                ou
              </Text>
              <View
                style={[styles.divider, { backgroundColor: theme.inputBorder }]}
              />
            </View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: theme.text }]}>
                Já tem uma conta?{" "}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleNavigateToLogin}>
                <Text
                  style={[styles.loginLink, { color: theme.primary }]}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <TabsFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: stylesRoot.spacing.m,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: stylesRoot.spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: stylesRoot.radius.l,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: stylesRoot.spacing.m,
  },
  title: {
    fontSize: stylesRoot.fontSize.xxl,
    fontWeight: "bold",
    marginBottom: stylesRoot.spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: stylesRoot.fontSize.m,
    textAlign: "center",
  },
  form: {
    width: "100%",
    gap: stylesRoot.spacing.m,
  },
  inputContainer: {
    gap: stylesRoot.spacing.xs,
  },
  label: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "600",
    marginBottom: stylesRoot.spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: stylesRoot.radius.m,
    paddingHorizontal: stylesRoot.spacing.m,
  },
  inputIcon: {
    marginRight: stylesRoot.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: stylesRoot.fontSize.m,
  },
  eyeIcon: {
    padding: stylesRoot.spacing.xs,
  },
  registerButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesRoot.spacing.s,
  },
  registerButtonText: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: stylesRoot.spacing.m,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: stylesRoot.spacing.m,
    fontSize: stylesRoot.fontSize.s,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesRoot.spacing.s,
  },
  loginText: {
    fontSize: stylesRoot.fontSize.m,
  },
  loginLink: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "600",
  },
});

