export const showSuccessAlert = (message: string) => {
  alert(message);
};

export const showErrorAlert = (message: string) => {
  alert(message);
};

export const showConfirmDialog = (message: string): boolean => {
  return window.confirm(message);
}; 