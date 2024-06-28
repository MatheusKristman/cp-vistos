import getCurrentUser from "./getCurrentUser";

export default async function getAdditionalForm() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }
  } catch (error) {
    return null;
  }
}
