export const tabulation = {
  gender: {
    1: "Male",
    2: "Female",
  },

  age: {
    1: "Less than 25 years",
    2: "26 - 35 years",
    3: "36 - 45 years",
    4: "More than 45 years",
  },

  region: {
    1: "Bahawalpur",
    2: "Faisalabad",
    3: "Gujranwala",
    4: "Head office",
    5: "Hyderabad",
    6: "Islamabad",
    7: "Jhang",
    8: "Karachi",
    9: "KPK/Rawalpindi",
    10: "Lahore",
    11: "Multan",
    12: "Sahiwal",
    13: "Sargodha",
    14: "Sukkur",
  },

  department: {
    1: "Accounts",
    2: "Finance",
    3: "Admin",
    4: "Human Resource (HR)",
    5: "Information Technology (IT)",
    6: "Operations",
    7: "Internal audit",
    8: "Compliance",
    9: "GESA",
    10: "Legal",
    11: "Research",
    12: "Udari",
    13: "CRAFTS",
    14: "Secretariat Department",
    15: "Strategic Communication",
  },

  empTenure: {
    1: "Less than 1 year",
    2: "1 - 3 years",
    3: "4 - 6 years",
    4: "7 - 10 years",
    5: "10 - 15 years",
    6: "15 - 20 years",
    7: "More than 20 years",
  },

  overallExperinceSatifyQ2: {
    1: "Highly Dissatisfied",
    2: "Dissatisfied",
    3: "Slightly Dissatisfied",
    4: "Neutral",
    5: "Highly Satisfied",
  },

  overallExperinceCompleteQ3: {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Slightly Disagree",
    4: "Neutral",
    5: "Slightly Agree",
    6: "Agree",
    7: "Strongly Agree",
  },

  overallExperinceRecommentQ4: {
    0: "I will definitely not recommend it",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "I will definitely recommend it",
  },
} as const;

export const filter = {
  gender: [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ],

  age: [
    { label: "Less than 25 years", value: "1" },
    { label: "26 - 35 years", value: "2" },
    { label: "36 - 45 years", value: "3" },
    { label: "More than 45 years", value: "4" },
  ],

  region: [
    { label: "Bahawalpur", value: "1" },
    { label: "Faisalabad", value: "2" },
    { label: "Gujranwala", value: "3" },
    { label: "Head office", value: "4" },
    { label: "Hyderabad", value: "5" },
    { label: "Islamabad", value: "6" },
    { label: "Jhang", value: "7" },
    { label: "Karachi", value: "8" },
    { label: "KPK/Rawalpindi", value: "9" },
    { label: "Lahore", value: "10" },
    { label: "Multan", value: "11" },
    { label: "Sahiwal", value: "12" },
    { label: "Sargodha", value: "13" },
    { label: "Sukkur", value: "14" },
  ],

  department: [
    { label: "Accounts", value: "1" },
    { label: "Finance", value: "2" },
    { label: "Admin", value: "3" },
    { label: "Human Resource (HR)", value: "4" },
    { label: "Information Technology (IT)", value: "5" },
    { label: "Operations", value: "6" },
    { label: "Internal Audit", value: "7" },
    { label: "Compliance", value: "8" },
    { label: "GESA", value: "9" },
    { label: "Legal", value: "10" },
    { label: "Research", value: "11" },
    { label: "Udari", value: "12" },
    { label: "CRAFTS", value: "13" },
    { label: "Secretariat Department", value: "14" },
    { label: "Strategic Communication", value: "15" },
  ],

  empTenure: [
    { label: "Less than 1 year", value: "1" },
    { label: "1 - 3 years", value: "2" },
    { label: "4 - 6 years", value: "3" },
    { label: "7 - 10 years", value: "4" },
    { label: "10 - 15 years", value: "5" },
    { label: "15 - 20 years", value: "6" },
    { label: "More than 20 years", value: "7" },
  ],
};
