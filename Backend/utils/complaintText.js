export const buildComplaintText = ({
  title,
  description,
  location,
  category,
}) => {
  return `
Title: ${title}
Description: ${description}
Location: ${location}
Category: ${category}
`.trim();
};