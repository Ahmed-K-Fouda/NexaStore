import umami from "@umami/node";

umami.init({
  websiteId: "6d484aac-4a57-4b10-a935-3de37fedaafd", 
  hostUrl: "https://cloud.umami.is", 
});

export const umamiTrackCheckoutSuccessEvent = async (payload: {
  [key: string]: string | number | Date;
}) => {
  await umami.track("checkout_success", payload);
};
