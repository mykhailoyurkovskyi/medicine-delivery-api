'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('medicine', [
      {
        categoryId: 1,
        name: "Amoxicillin",
        medicinalForm: "Capsules",
        description: "Broad-spectrum antibiotic used to treat various bacterial infections",
        price: 15.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 capsule every 8 hours with a full glass of water"
      },
      {
        categoryId: 1,
        name: "Azithromycin",
        medicinalForm: "Tablets",
        description: "Macrolide antibiotic used to treat respiratory infections and certain sexually transmitted diseases",
        price: 12.50,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 2 tablets as a single dose on the first day, followed by 1 tablet once daily for 4 more days"
      },
      {
        categoryId: 1,
        name: "Ciprofloxacin",
        medicinalForm: "Oral Suspension",
        description: "Fluoroquinolone antibiotic used to treat urinary tract infections and certain bacterial infections",
        price: 18.75,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 teaspoonful every 12 hours with or without food"
      },
      {
        categoryId: 1,
        name: "Doxycycline",
        medicinalForm: "Capsules",
        description: "Tetracycline antibiotic used to treat acne, respiratory infections, and certain sexually transmitted diseases",
        price: 14.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 capsule twice daily with a full glass of water, preferably with food"
      },
      {
        categoryId: 1,
        name: "Clarithromycin",
        medicinalForm: "Tablets",
        description: "Macrolide antibiotic used to treat respiratory tract infections and certain bacterial infections",
        price: 17.25,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet twice daily with or without food, for 7 to 14 days"
      },
      {
        categoryId: 2,
        name: 'Paracetamol',
        medicinalForm: 'Tablets',
        description: 'Pain reliever and fever reducer',
        price: 10.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: 'Take 1 tablet every 4-6 hours as needed',
      },
      {
        categoryId: 2,
        name: "Aspirin",
        medicinalForm: "Tablets",
        description: "Pain reliever, fever reducer, and anti-inflammatory drug",
        price: 8.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet every 4-6 hours as needed"
      },
      {
        categoryId: 2,
        name: "Acetaminophen",
        medicinalForm: "Liquid",
        description: "Commonly used for pain relief and fever reduction",
        price: 7.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 10-15 mL every 4-6 hours as needed, not to exceed 4 doses in 24 hours"
      },
      {
        categoryId: 2,
        name: "Naproxen",
        medicinalForm: "Extended-Release Tablets",
        description: "Nonsteroidal anti-inflammatory drug (NSAID) for pain and inflammation relief",
        price: 9.75,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet every 12 hours with a full glass of water"
      },
      {
        categoryId: 2,
        name: "Diclofenac",
        medicinalForm: "Topical Gel",
        description: "NSAID gel for localized pain and inflammation relief",
        price: 15.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Apply a thin layer to affected area 3-4 times daily, or as directed"
      },
      {
        categoryId: 3,
        name: "NOW Foods Vitamin D3",
        medicinalForm: "Softgel Capsules",
        description: "Essential vitamin for bone health and immune function",
        price: 9.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 softgel capsule daily with a meal"
      },
      {
        categoryId: 3,
        name: "California Gold Nutrition Vitamin C Plus Zinc",
        medicinalForm: "Chewable Tablets",
        description: "Combination of vitamin C and zinc for immune support and antioxidant benefits",
        price: 12.50,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 chewable tablet daily, preferably with a meal"
      },
      {
        categoryId: 3,
        name: "Forever Omega-3 Fish Oil",
        medicinalForm: "Softgel Capsules",
        description: "Source of omega-3 fatty acids for heart health and brain function",
        price: 14.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 2 softgel capsules daily with food"
      },
      {
        categoryId: 3,
        name: "California Gold Nutrition Vitamin B Complex",
        medicinalForm: "Tablets",
        description: "Combination of B vitamins for energy metabolism and nervous system support",
        price: 11.75,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet daily with a meal"
      },
      {
        categoryId: 3,
        name: "California Gold Nutrition Vitamin E Oil",
        medicinalForm: "Topical Solution",
        description: "Topical vitamin E oil for skin health and hydration",
        price: 8.25,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Apply a small amount to the skin and massage gently as needed"
      },
      {
        categoryId: 4,
        name: 'Ibuprofen',
        medicinalForm: 'Capsules',
        description: 'Nonsteroidal anti-inflammatory drug (NSAID)',
        price: 8.50,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: 'Take 1 capsule every 4-6 hours with food',
      },
      {
        categoryId: 4,
        name: "Naproxen Sensetive",
        medicinalForm: "Caplets",
        description: "NSAID used for relief of pain, inflammation, and stiffness caused by conditions such as arthritis",
        price: 12.50,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 caplet every 8-12 hours with a full glass of water"
      },
      {
        categoryId: 4,
        name: "Diclofenac Anti-inflammatory agent",
        medicinalForm: "Topical Gel",
        description: "Topical NSAID gel for relief of pain and inflammation associated with musculoskeletal conditions",
        price: 14.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Apply a thin layer of gel to affected area 3-4 times daily, gently rubbing in"
      },
      {
        categoryId: 4,
        name: "Celecoxib",
        medicinalForm: "Capsules",
        description: "Selective COX-2 inhibitor NSAID for relief of pain and inflammation with reduced risk of stomach ulcers",
        price: 11.75,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 capsule daily with food or milk"
      },
      {
        categoryId: 4,
        name: "Meloxicam",
        medicinalForm: "Oral Suspension",
        description: "NSAID for relief of pain and inflammation associated with osteoarthritis and rheumatoid arthritis",
        price: 8.25,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 7.5 mg to 15 mg once daily with or without food"
      },
      {
        categoryId: 5,
        name: "Loratadine",
        medicinalForm: "Tablets",
        description: "Non-sedating antihistamine for relief of allergy symptoms such as sneezing, itching, and runny nose",
        price: 9.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet daily with or without food"
      },
      {
        categoryId: 5,
        name: "Cetirizine",
        medicinalForm: "Oral Solution",
        description: "Antihistamine used to treat allergic rhinitis and urticaria",
        price: 12.50,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 10 mL once daily, or as directed by a healthcare professional"
      },
      {
        categoryId: 5,
        name: "Fexofenadine",
        medicinalForm: "Capsules",
        description: "Non-drowsy antihistamine for relief of allergy symptoms such as sneezing, itching, and watery eyes",
        price: 14.99,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 capsule daily with water, with or without food"
      },
      {
        categoryId: 5,
        name: "Diphenhydramine",
        medicinalForm: "Liquid",
        description: "First-generation antihistamine with sedating effects, used for allergy relief and as a sleep aid",
        price: 11.75,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 2 teaspoons (10 mL) every 4-6 hours, or as needed, not to exceed 6 doses in 24 hours"
      },
      {
        categoryId: 5,
        name: "Chlorpheniramine",
        medicinalForm: "Tablets",
        description: "Antihistamine used for relief of allergy symptoms and as a cough suppressant",
        price: 8.25,
        expirationDate: new Date('2023-12-31'),
        dosageInstructions: "Take 1 tablet every 4-6 hours, or as directed by a healthcare professional"
      }
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('medicine', null, {});
  }
};
