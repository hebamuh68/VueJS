import { required, email, minLength, sameAs } from '@vuelidate/validators';

export const loginRules = {
  email: { required, email },
  password: { required, minLength: minLength(6) }
};

export const signupRules = {
  ...loginRules,
  username: { required },
  confirmPassword: { sameAs: sameAs('password') }
};