// Route parameter types for every navigator in the app.
// Import these in screens that need typed route.params.

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Features: undefined;
  Privacy: undefined;
  RoleSelection: undefined;
  CreateAccount: { userType: 'user' | 'guardian' };
  ConnectBean: undefined;
  BeanConnected: undefined;
  LoginUser: undefined;
  LoginGuardian: undefined;
  ForgotPassword: { userType: 'user' | 'guardian' };
  VerifyCode: { email: string; userType: 'user' | 'guardian' };
  OTPVerification: { maskedContact: string; userType: 'user' | 'guardian' };
  CreateNewPassword: { userType: 'user' | 'guardian' };
  PasswordResetSuccess: { userType: 'user' | 'guardian' };
  UserApp: undefined;
  CaregiverApp: { screen?: string } | undefined;
};

export type UserStackParamList = {
  Home: undefined;
  CasualConvo: undefined;
  Chat: undefined;
  FocusMode: undefined;
  Tasks: undefined;
  PlayGames: undefined;
  PlayCalmMusic: undefined;
  CalmingExercises: undefined;
  TherapeuticConversations: undefined;
  SOSDetection: undefined;
  EmergencyContacts: undefined;
  AddNewContact: undefined;
  Profile: undefined;
  AccountInfo: undefined;
  MoodCalendar: undefined;
  RobotConnectivity: undefined;
  Display: undefined;
  BluetoothConnectivity: undefined;
  NotificationPreferences: undefined;
  PrivacySettings: undefined;
  HelpCenter: undefined;
};

export type CaregiverStackParamList = {
  EnterWardEmail: undefined;
  VerifyPatientEmail: { maskedEmail: string };
  VerificationSuccessful: undefined;
  CaregiverDashboard: undefined;
  CaregiverAccount: undefined;
};
