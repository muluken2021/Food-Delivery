/**
 * Returns the localized name of a food item.
 * Falls back to English if the Amharic field is missing (e.g. backend items).
 */
export const getFoodName = (food, language) => {
  if (language === "AM" && food.name_am) return food.name_am;
  return food.name;
};

/**
 * Returns the localized description of a food item.
 * Falls back to English if the Amharic field is missing.
 */
export const getFoodDescription = (food, language) => {
  if (language === "AM" && food.description_am) return food.description_am;
  return food.description || "";
};
