export const bloodTypeData = {
  "O+": {
    name: "Type O Positive",
    prevalence: "~38%",
    prevalenceDescription: "The most common blood type globally.",
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
    description: "O Positive is the most needed blood type by hospitals. Red blood cells from an O+ donor can be given to patients with any positive Rh blood type.",
    traits: [
      "No A or B antigens on red cells",
      "Contains Rh factor",
      "Both anti-A and anti-B antibodies in plasma"
    ],
    healthInsights: [
      "Most common blood type — high demand for blood donations",
      "Lower risk of heart disease and blood clots",
      "Higher risk of stomach ulcers due to H. pylori susceptibility",
      "Thrives on high-protein diet with lean meats and vegetables"
    ]
  },
  "O-": {
    name: "Type O Negative",
    prevalence: "~7%",
    prevalenceDescription: "The universal red cell donor.",
    canDonateTo: ["All Blood Types", "(O+, O-, A+, A-, B+, B-, AB+, AB-)"],
    canReceiveFrom: ["O-"],
    description: "O Negative is the 'universal donor'. In trauma situations, this is the blood type used when a patient's blood type is unknown.",
    traits: [
      "No A, B, or Rh antigens",
      "Highest demand in emergency rooms",
      "Only compatible with other O- blood"
    ],
    healthInsights: [
      "Universal red cell donor — critical for emergency medicine",
      "Generally lower risk for pancreatic cancer and blood clots",
      "Higher risk for stomach ulcers and H. pylori infections",
      "Produces fewer clotting proteins compared to other types"
    ]
  },
  "A+": {
    name: "Type A Positive",
    prevalence: "~34%",
    prevalenceDescription: "The second most common blood type.",
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    description: "A Positive donors are highly encouraged to donate whole blood and platelets to help patients undergoing surgery or cancer treatment.",
    traits: [
      "Has A antigens",
      "Contains Rh factor",
      "Anti-B antibodies in plasma"
    ],
    healthInsights: [
      "Higher baseline levels of cortisol, meaning stress may impact you more",
      "Slightly increased risk for cardiovascular issues and blood clots",
      "Greater susceptibility to certain tick-borne bacterial infections",
      "Often benefits from plant-based or vegetarian-leaning diets"
    ]
  },
  "A-": {
    name: "Type A Negative",
    prevalence: "~6%",
    prevalenceDescription: "A valuable, relatively rare blood type.",
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
    description: "A Negative blood can be accepted by anyone with an A or AB blood type because it lacks B antigens and the Rh factor.",
    traits: [
      "Has A antigens",
      "No Rh factor",
      "Anti-B antibodies in plasma"
    ],
    healthInsights: [
      "Valuable donor type, especially for other A or AB negative patients",
      "Slightly higher risk of certain digestive tract cancers",
      "Produces more blood-clotting proteins than type O",
      "May have a natural resistance to certain strains of cholera"
    ]
  },
  "B+": {
    name: "Type B Positive",
    prevalence: "~9%",
    prevalenceDescription: "An important blood type for specialized needs.",
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    description: "B Positive is crucial, especially in specific populations where it is more common, such as South Asian demographics.",
    traits: [
      "Has B antigens",
      "Contains Rh factor",
      "Anti-A antibodies in plasma"
    ],
    healthInsights: [
      "Offers some natural resistance to cholera and other severe infections",
      "Slightly elevated risk for deep vein thrombosis compared to type O",
      "Robust immune system responses, though more prone to autoimmune issues",
      "Benefits from a balanced diet of meats and dairy, avoiding chicken and corn"
    ]
  },
  "B-": {
    name: "Type B Negative",
    prevalence: "~2%",
    prevalenceDescription: "One of the rarest blood types.",
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
    description: "Because B Negative is so rare, patients requiring it rely heavily on a small pool of regular dedicated donors.",
    traits: [
      "Has B antigens",
      "No Rh factor",
      "Anti-A antibodies in plasma"
    ],
    healthInsights: [
      "Extremely rare blood type, making dedicated blood donation vital",
      "Shares the elevated risk for pancreatic cancer seen in types A and B",
      "Naturally protected against certain strains of severe malaria",
      "Requires careful monitoring when receiving blood transfusions due to rarity"
    ]
  },
  "AB+": {
    name: "Type AB Positive",
    prevalence: "~3%",
    prevalenceDescription: "The universal recipient and universal plasma donor.",
    canDonateTo: ["AB+"],
    canReceiveFrom: ["All Blood Types"],
    description: "While AB+ individuals can receive any blood type, they are the 'universal plasma donors'. Their plasma can safely be given to anyone.",
    traits: [
      "Has both A and B antigens",
      "Contains Rh factor",
      "No anti-A or anti-B antibodies"
    ],
    healthInsights: [
      "Universal plasma donor — highly sought after for trauma patients",
      "Highest risk for cognitive decline and memory issues in later years",
      "Elevated risk for cardiovascular disease and stroke compared to type O",
      "Features a highly tolerant immune system due to possessing both antigens"
    ]
  },
  "AB-": {
    name: "Type AB Negative",
    prevalence: "~1%",
    prevalenceDescription: "The rarest blood type globally.",
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"],
    description: "AB Negative is extremely rare. Like AB+, their plasma is highly valuable and can be given to almost anyone.",
    traits: [
      "Has both A and B antigens",
      "No Rh factor",
      "No anti-A or anti-B antibodies"
    ],
    healthInsights: [
      "The rarest blood type in the world, present in less than 1% of the population",
      "Universal plasma donor for negative blood types",
      "Higher likelihood of developing preeclampsia during pregnancy",
      "May require specialized care when sourcing compatible blood for surgeries"
    ]
  }
};
