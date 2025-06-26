import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const Toast = ({
  successMessage,
  errorMessage,
  onDismissSuccess,
  onDismissError,
  duration = 4000,
  login = false,
}) => {
  return (
    <>
      {/* Toast de Sucesso */}
      <Snackbar
        visible={!!successMessage}
        onDismiss={onDismissSuccess}
        duration={duration}
        style={[styles.successToast, !login && styles.toastPosition]}
        action={{
          label: "OK",
          labelStyle: styles.actionLabel,
          onPress: onDismissSuccess,
        }}
      >
        {successMessage}
      </Snackbar>

      {/* Toast de Erro */}
      <Snackbar
        visible={!!errorMessage}
        onDismiss={onDismissError}
        duration={duration}
        style={[styles.errorToast, !login && styles.toastPosition]}
        action={{
          label: "OK",
          labelStyle: styles.actionLabel,
          onPress: onDismissError,
        }}
      >
        {errorMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  successToast: {
    backgroundColor: "#4caf50",
  },
  errorToast: {
    backgroundColor: "#f44336",
  },
  toastPosition: {
    marginBottom: 90,
  },
  actionLabel: {
    color: "#ffffff",
  },
});

export default Toast;
