-- JOBDOMAIN
INSERT INTO "JobDomain" (id, domaine, "createdAt", "updatedAt") VALUES
('job1', 'Software Engineering', NOW(), NOW()),
('job2', 'Marketing', NOW(), NOW()),
('job3', 'Design', NOW(), NOW()),
('job4', 'Finance', NOW(), NOW()),
('job5', 'Human Resources', NOW(), NOW());

-- USER
INSERT INTO "User" (
  id, linkedin, website, youtube, instagram, "lastName", "firstName", email, "photoUrl",
  "jobTitle", address, "addressComplement", "postalCode", city, country, "createdAt", "updatedAt", "lastLogin", phone,
  password, "domainId", "companyId", "isAdmin", "retentionDate", "consentTerms", "consentMarketing"
) VALUES
('user1', 'https://linkedin.com/in/johnsmith', 'https://johnsmith.dev', NULL, NULL, 'Smith', 'John', 'john.smith@acme.com', NULL, 'Lead Developer', '10 Rue de Paris', NULL, 75001, 'Paris', 'France', NOW(), NOW(), NOW(), '0600000001', 'pw1', 'job1', 'comp1', TRUE, NOW(), TRUE, TRUE),
('user2', 'https://linkedin.com/in/janedoe', 'https://janedoe.com', NULL, NULL, 'Doe', 'Jane', 'jane.doe@beta.com', NULL, 'Marketing Manager', '22 Avenue des Champs', NULL, 69002, 'Lyon', 'France', NOW(), NOW(), NOW(), '0600000002', 'pw2', 'job2', 'comp2', FALSE, NOW(), TRUE, FALSE),
('user3', 'https://linkedin.com/in/alicebrown', 'https://alicebrown.design', NULL, NULL, 'Brown', 'Alice', 'alice.brown@gamma.com', NULL, 'UI Designer', '5 Boulevard Saint-Michel', NULL, 13003, 'Marseille', 'France', NOW(), NOW(), NOW(), '0600000003', 'pw3', 'job3', 'comp3', FALSE, NOW(), FALSE, TRUE),
('user4', 'https://linkedin.com/in/bobwhite', 'https://bobwhite.finance', NULL, NULL, 'White', 'Bob', 'bob.white@delta.com', NULL, 'Financial Analyst', '8 Place Massena', NULL, 6000, 'Nice', 'France', NOW(), NOW(), NOW(), '0600000004', 'pw4', 'job4', 'comp4', FALSE, NOW(), TRUE, TRUE),
('user5', 'https://linkedin.com/in/eveblack', 'https://eveblack.hr', NULL, NULL, 'Black', 'Eve', 'eve.black@epsilon.com', NULL, 'HR Specialist', '15 Rue du Capitole', NULL, 31000, 'Toulouse', 'France', NOW(), NOW(), NOW(), '0600000005', 'pw5', 'job5', 'comp5', FALSE, NOW(), FALSE, FALSE);

-- COMPANY
INSERT INTO "Company" (
  id, name, address, "addressComplement", "postalCode", city, country, "createdAt", "updatedAt", "lastLogin",
  "recommendationRate", email, phone, website, "photoUrl", description,
  linkedin, "subscriptionId", "ownerId", "retentionDate"
) VALUES
('comp1', 'Acme Corp', '10 Rue de Paris', NULL, 75001, 'Paris', 'France', NOW(), NOW(), NOW(), '4.8', 'contact@acme.com', '0100000001', 'https://acme.com', NULL, 'Acme Corp is a leading software engineering company specializing in scalable web applications.', 'https://linkedin.com/company/acme', 'sub1', 'user1', NOW()),
('comp2', 'Beta Ltd', '22 Avenue des Champs', NULL, 69002, 'Lyon', 'France', NOW(), NOW(), NOW(), '4.5', 'contact@beta.com', '0100000002', 'https://beta.com', NULL, 'Beta Ltd delivers innovative marketing solutions for modern businesses.', 'https://linkedin.com/company/beta', 'sub2', 'user2', NOW()),
('comp3', 'Gamma SAS', '5 Boulevard Saint-Michel', NULL, 13003, 'Marseille', 'France', NOW(), NOW(), NOW(), '4.7', 'contact@gamma.com', '0100000003', 'https://gamma.com', NULL, 'Gamma SAS is a creative design agency with a focus on user experience.', 'https://linkedin.com/company/gamma', 'sub3', 'user3', NOW()),
('comp4', 'Delta Inc', '8 Place Massena', NULL, 6000, 'Nice', 'France', NOW(), NOW(), NOW(), '4.2', 'contact@delta.com', '0100000004', 'https://delta.com', NULL, 'Delta Inc provides expert financial consulting for startups and enterprises.', 'https://linkedin.com/company/delta', 'sub4', 'user4', NOW()),
('comp5', 'Epsilon GmbH', '15 Rue du Capitole', NULL, 31000, 'Toulouse', 'France', NOW(), NOW(), NOW(), '4.9', 'contact@epsilon.com', '0100000005', 'https://epsilon.com', NULL, 'Epsilon GmbH is a trusted HR partner for companies across Europe.', 'https://linkedin.com/company/epsilon', 'sub5', 'user5', NOW());

-- SUBSCRIPTION
INSERT INTO "Subscription" (
  id, "startDate", duration, type, state, "endDate", "cancelledDate", "retentionDate", "createdAt", "updatedAt", "companyId"
) VALUES
('sub1', NOW(), 12, 'Indep', 'ACTIVE', NOW() + INTERVAL '1 year', NULL, NULL, NOW(), NOW(), 'comp1'),
('sub2', NOW(), 6, 'VSB', 'SUSPENDED', NOW() + INTERVAL '6 months', NULL, NULL, NOW(), NOW(), 'comp2'),
('sub3', NOW(), 3, 'SMB', 'CANCELED', NOW() + INTERVAL '3 months', NOW(), NULL, NOW(), NOW(), 'comp3'),
('sub4', NOW(), 24, 'Indep', 'ACTIVE', NOW() + INTERVAL '2 years', NULL, NULL, NOW(), NOW(), 'comp4'),
('sub5', NOW(), 1, 'VSB', 'ACTIVE', NOW() + INTERVAL '1 month', NULL, NULL, NOW(), NOW(), 'comp5');

-- RGPD
INSERT INTO "RGPD" (
  id, "createdAt", "updatedAt", "consentType", consented, "consentVersion", "consentDate", "consentText", "IP", "UserAgent", "userId", "retentionDate"
) VALUES
('rgpd1', NOW(), NOW(), 'TERMS', TRUE, 'v1', NOW(), 'Accepted terms and conditions.', '127.0.0.1', 'Mozilla/5.0', 'user1', NULL),
('rgpd2', NOW(), NOW(), 'MARKETING', FALSE, 'v1', NOW(), 'Declined marketing emails.', '127.0.0.2', 'Mozilla/5.0', 'user2', NULL),
('rgpd3', NOW(), NOW(), 'PAYMENTS', TRUE, 'v2', NOW(), 'Accepted payment processing terms.', '127.0.0.3', 'Mozilla/5.0', 'user3', NULL),
('rgpd4', NOW(), NOW(), 'TERMS', TRUE, 'v2', NOW(), 'Accepted updated terms.', '127.0.0.4', 'Mozilla/5.0', 'user4', NULL),
('rgpd5', NOW(), NOW(), 'MARKETING', FALSE, 'v3', NOW(), 'Declined marketing emails.', '127.0.0.5', 'Mozilla/5.0', 'user5', NULL);

-- RECOMMANDATION
INSERT INTO "Recommandation" (
  id, "createdAt", "updatedAt", priority, "firstName", "lastName", email, phone, address, "addressComplement", "postalCode", city, description, "startDate", "inProgressAt", "endDate", "isAccepted", "RecoStateInitiator", "rejectionReasonInitiator", "RecoStateCompany", "rejectionReasonCompany", companyId, initiatorId, recipientId, "retentionDate"
) VALUES
('rec1', NOW(), NOW(), 1, 'Alice', 'Smith', 'alice.smith@acme.com', '0600000011', '10 Rue de Paris', NULL, 75001, 'Paris', 'Alice consistently delivered high-quality work and was a pleasure to collaborate with.', NOW(), NOW(), NOW(), TRUE, 'ACCEPTED', NULL, 'ACCEPTED', NULL, 'comp1', 'user1', 'user2', NULL),
('rec2', NOW(), NOW(), 2, 'Bob', 'Doe', 'bob.doe@beta.com', '0600000012', '22 Avenue des Champs', NULL, 69002, 'Lyon', 'Bob demonstrated excellent leadership and communication skills.', NOW(), NOW(), NOW(), TRUE, 'ACCEPTED', NULL, 'ACCEPTED', NULL, 'comp2', 'user2', 'user3', NULL),
('rec3', NOW(), NOW(), 3, 'Charlie', 'Brown', 'charlie.brown@gamma.com', '0600000013', '5 Boulevard Saint-Michel', NULL, 13003, 'Marseille', 'Charlie brought creative solutions to every project.', NOW(), NOW(), NOW(), TRUE, 'ACCEPTED', NULL, 'ACCEPTED', NULL, 'comp3', 'user3', 'user4', NULL),
('rec4', NOW(), NOW(), 4, 'David', 'White', 'david.white@delta.com', '0600000014', '8 Place Massena', NULL, 6000, 'Nice', 'Financial expertise of David was invaluable to our team.', NOW(), NOW(), NOW(), TRUE, 'ACCEPTED', NULL, 'ACCEPTED', NULL, 'comp4', 'user4', 'user5', NULL),
('rec5', NOW(), NOW(), 5, 'Eve', 'Black', 'eve.black@epsilon.com', '0600000015', '15 Rue du Capitole', NULL, 31000, 'Toulouse', 'Eve is a dedicated HR specialist who always puts people first.', NOW(), NOW(), NOW(), TRUE, 'ACCEPTED', NULL, 'ACCEPTED', NULL, 'comp5', 'user5', 'user1', NULL);

-- PROJECT
INSERT INTO "Project" (
  id, "createdAt", "updatedAt", name, description, "startDate", "endDate", priority, "isPublic", companyId, "ProjectState", "ProjectChoiceCompany", "rejectionReasonCompany", userId, "retentionDate"
) VALUES
('proj1', NOW(), NOW(), 'Website Redesign', 'Redesign of the corporate website to improve UX and performance.', NOW(), NOW() + INTERVAL '1 month', 1, TRUE, 'comp1', 'COMPLETED', 'ACCEPTED', NULL, 'user1', NULL),
('proj2', NOW(), NOW(), 'Marketing Campaign', 'Launch of a new digital marketing campaign for product X.', NOW(), NOW() + INTERVAL '2 months', 2, FALSE, 'comp2', 'IN_PROGRESS', 'PENDING', NULL, 'user2', NULL),
('proj3', NOW(), NOW(), 'Mobile App', 'Development of a cross-platform mobile application.', NOW(), NOW() + INTERVAL '3 months', 3, TRUE, 'comp3', 'PENDING', 'PENDING', NULL, 'user3', NULL),
('proj4', NOW(), NOW(), 'Financial Audit', 'Comprehensive audit of company finances for 2024.', NOW(), NOW() + INTERVAL '4 months', 4, FALSE, 'comp4', 'ARCHIVED', 'REJECTED', 'Budget constraints', 'user4', NULL),
('proj5', NOW(), NOW(), 'HR Onboarding', 'Creation of a new onboarding process for new hires.', NOW(), NOW() + INTERVAL '5 months', 5, TRUE, 'comp5', 'COMPLETED', 'ACCEPTED', NULL, 'user5', NULL);

-- COMPANYPROJECT
INSERT INTO "CompanyProject" (
  projectId, companyId, "createdAt", "updatedAt", "retentionDate", "UserChoiceState", "rejectionReason"
) VALUES
('proj1', 'comp1', NOW(), NOW(), NULL, 'PENDING', NULL),
('proj2', 'comp2', NOW(), NOW(), NULL, 'PENDING', NULL),
('proj3', 'comp3', NOW(), NOW(), NULL, 'PENDING', NULL),
('proj4', 'comp4', NOW(), NOW(), NULL, 'PENDING', 'Not aligned with company goals'),
('proj5', 'comp5', NOW(), NOW(), NULL, 'PENDING', NULL);

-- REVIEW
INSERT INTO "Review" (
  id, "createdAt", "updatedAt", rating, comment, userId, projectId, companyId, "retentionDate"
) VALUES
('rev1', NOW(), NOW(), 5, 'It was great to work with Acme Corp on the website redesign. The team was professional and delivered ahead of schedule.', 'user1', 'proj1', 'comp1', NULL),
('rev2', NOW(), NOW(), 4, 'Marketing expertise of Beta Ltd helped us reach a wider audience. Highly recommended.', 'user2', 'proj2', 'comp2', NULL),
('rev3', NOW(), NOW(), 5, 'Gamma SAS created a beautiful and functional mobile app for our business.', 'user3', 'proj3', 'comp3', NULL),
('rev4', NOW(), NOW(), 3, 'Delta Inc provided a thorough financial audit, though the process took longer than expected.', 'user4', 'proj4', 'comp4', NULL),
('rev5', NOW(), NOW(), 5, 'Epsilon GmbH made onboarding new employees seamless and efficient.', 'user5', 'proj5', 'comp5', NULL);

-- PAYMENTMETHOD
INSERT INTO "PaymentMethod" (
  id, paymentToken, paymentProvider, "createdAt", "updatedAt", type, lastFourDigits, cardHolderName, expirationMonth, expirationYear, consentDate, "consentType", consented, details, processingDate, userId, "retentionDate"
) VALUES
('pm1', 'tok1', 'stripe', NOW(), NOW(), 'card', '1111', 'John Smith', 12, 2025, NOW(), 'TERMS', TRUE, NULL, NULL, 'user1', NULL),
('pm2', 'tok2', 'paypal', NOW(), NOW(), 'paypal', NULL, NULL, NULL, NULL, NOW(), 'MARKETING', FALSE, NULL, NULL, 'user2', NULL),
('pm3', 'tok3', 'stripe', NOW(), NOW(), 'card', '2222', 'Alice Brown', 6, 2024, NOW(), 'PAYMENTS', TRUE, NULL, NULL, 'user3', NULL),
('pm4', 'tok4', 'stripe', NOW(), NOW(), 'card', '3333', 'Bob White', 9, 2026, NOW(), 'TERMS', TRUE, NULL, NULL, 'user4', NULL),
('pm5', 'tok5', 'paypal', NOW(), NOW(), 'paypal', NULL, NULL, NULL, NULL, NOW(), 'MARKETING', FALSE, NULL, NULL, 'user5', NULL);

-- TRANSACTION
INSERT INTO "Transaction" (
  id, externalId, "createdAt", "updatedAt", amount, type, currency, "State", processingDate, subscriptionId, "retentionDate", "PaymentMethodId"
) VALUES
('txn1', 'ext1', NOW(), NOW(), 100.0, 'payment', 'EUR', 'COMPLETED', NOW(), 'sub1', NULL, 'pm1'),
('txn2', 'ext2', NOW(), NOW(), 50.0, 'refund', 'USD', 'REFUNDED', NOW(), 'sub2', NULL, 'pm2'),
('txn3', 'ext3', NOW(), NOW(), 75.0, 'chargeback', 'EUR', 'FAILED', NOW(), 'sub3', NULL, 'pm3'),
('txn4', 'ext4', NOW(), NOW(), 200.0, 'payment', 'USD', 'COMPLETED', NOW(), 'sub4', NULL, 'pm4'),
('txn5', 'ext5', NOW(), NOW(), 150.0, 'payment', 'EUR', 'PENDING', NOW(), 'sub5', NULL, 'pm5');

-- INVOICE
INSERT INTO "Invoice" (
  id, name, address, "addressComplement", postalCode, city, VATNumber, billingPeriodStart, billingPeriodEnd, issuedAt, dueAt, paidAt, Status, "retentionDate", amount, currency, tax_ammount, subscriptionId, type
) VALUES
('inv1', 'Invoice 1', '10 Rue de Paris', NULL, 75001, 'Paris', 'FR123', NOW() - INTERVAL '1 month', NOW(), NOW(), NOW() + INTERVAL '30 days', NOW(), 'PAID', NULL, 100.0, 'EUR', 20.0, 'sub1', 'PAID'),
('inv2', 'Invoice 2', '22 Avenue des Champs', NULL, 69002, 'Lyon', 'FR124', NOW() - INTERVAL '2 months', NOW(), NOW(), NOW() + INTERVAL '30 days', NULL, 'SENT', NULL, 50.0, 'USD', 10.0, 'sub2', 'PENDING'),
('inv3', 'Invoice 3', '5 Boulevard Saint-Michel', NULL, 13003, 'Marseille', 'FR125', NOW() - INTERVAL '3 months', NOW(), NOW(), NOW() + INTERVAL '30 days', NULL, 'OVERDUE', NULL, 75.0, 'EUR', 15.0, 'sub3', 'FAILED'),
('inv4', 'Invoice 4', '8 Place Massena', NULL, 6000, 'Nice', 'FR126', NOW() - INTERVAL '4 months', NOW(), NOW(), NOW() + INTERVAL '30 days', NULL, 'DRAFT', NULL, 200.0, 'USD', 40.0, 'sub4', 'PENDING'),
('inv5', 'Invoice 5', '15 Rue du Capitole', NULL, 31000, 'Toulouse', 'FR127', NOW() - INTERVAL '5 months', NOW(), NOW(), NOW() + INTERVAL '30 days', NULL, 'CANCELED', NULL, 150.0, 'EUR', 30.0, 'sub5', 'PAID');