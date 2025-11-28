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

export default function Login() {
  const { theme } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Apenas estático, não faz nada
  };

  const handleNavigateToRegister = () => {
    router.push("/auth/register");
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
                name="person"
                size={48}
                color={theme.buttonText}
              />
            </View>
            <Text style={[styles.title, { color: theme.text }]}>
              Bem-vindo de volta!
            </Text>
            <Text style={[styles.subtitle, { color: theme.inputPlaceholder }]}>
              Entre com suas credenciais para continuar
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
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

            {/* Forgot Password */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.forgotPassword}
            >
              <Text
                style={[styles.forgotPasswordText, { color: theme.primary }]}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                {
                  backgroundColor: theme.buttonBackground,
                  borderRadius: stylesRoot.radius.m,
                },
              ]}
            >
              <Text style={[styles.loginButtonText, { color: theme.buttonText }]}>
                Entrar
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

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={[styles.signUpText, { color: theme.text }]}>
                Não tem uma conta?{" "}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={handleNavigateToRegister}>
                <Text
                  style={[styles.signUpLink, { color: theme.primary }]}
                >
                  Criar conta
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -stylesRoot.spacing.s,
  },
  forgotPasswordText: {
    fontSize: stylesRoot.fontSize.s,
    fontWeight: "600",
  },
  loginButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesRoot.spacing.s,
  },
  loginButtonText: {
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
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesRoot.spacing.s,
  },
  signUpText: {
    fontSize: stylesRoot.fontSize.m,
  },
  signUpLink: {
    fontSize: stylesRoot.fontSize.m,
    fontWeight: "600",
  },
});

