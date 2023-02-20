export function getAvatarUser(avatar: string, sexe: string) {
  if (avatar) {
    return avatar;
  }
  if (sexe == "Femme") return "/images/girl.svg";
  return "/images/man.svg";
}
