export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export  const sharedState: SharedState = {
  showLoading: false,
  errorMessage:  ''
}
