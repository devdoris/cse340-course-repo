-- ========================================
-- Drop Tables (Optional)
-- ========================================

DROP TABLE IF EXISTS project_category;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS organization;

-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert Sample Data: Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Project Table
-- ========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);

-- ========================================
-- Insert Sample Data: Projects
-- ========================================

INSERT INTO project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
(
    1,
    'Food Drive',
    'Collect and distribute food to families in need.',
    'Lagos',
    '2026-08-01'
),
(
    2,
    'Urban Garden',
    'Build community gardens in urban neighborhoods.',
    'Abuja',
    '2026-08-05'
),
(
    1,
    'School Renovation',
    'Renovate classrooms and learning spaces.',
    'Ibadan',
    '2026-08-10'
),
(
    3,
    'Charity Run',
    'Organize a charity run to raise funds.',
    'Port Harcourt',
    '2026-08-12'
),
(
    2,
    'Farm Workshop',
    'Teach sustainable farming techniques.',
    'Enugu',
    '2026-08-18'
),
(
    1,
    'Community Cleanup',
    'Clean streets and public spaces.',
    'Kano',
    '2026-08-20'
),
(
    2,
    'Recycling Campaign',
    'Promote recycling awareness.',
    'Abeokuta',
    '2026-08-25'
),
(
    3,
    'Youth Mentoring',
    'Mentor young people through community programs.',
    'Kaduna',
    '2026-08-28'
),
(
    1,
    'Tree Planting',
    'Plant trees to improve the environment.',
    'Ilorin',
    '2026-09-01'
),
(
    3,
    'Book Donation',
    'Donate books to rural schools.',
    'Calabar',
    '2026-09-05'
),
(
    2,
    'Clean Water Project',
    'Install water filters in schools.',
    'Jos',
    '2026-09-08'
),
(
    1,
    'Health Outreach',
    'Provide free health screenings.',
    'Benin City',
    '2026-09-15'
),
(
    3,
    'Senior Support',
    'Visit and assist elderly residents.',
    'Uyo',
    '2026-09-18'
),
(
    2,
    'Nutrition Program',
    'Provide healthy meals for children.',
    'Owerri',
    '2026-09-22'
),
(
    3,
    'Holiday Meals',
    'Prepare meals for families in need.',
    'Onitsha',
    '2026-12-20'
);

-- ========================================
-- Category Table
-- ========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Insert Sample Data: Categories
-- ========================================

INSERT INTO category (name)
VALUES
('Community Service'),
('Education'),
('Environment'),
('Health'),
('Food Assistance');

-- ========================================
-- Project Category Table
-- ========================================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Data: Project Categories
-- ========================================

INSERT INTO project_category (
    project_id,
    category_id
)
VALUES
(1, 5),
(2, 3),
(3, 1),
(4, 5),
(5, 2),
(6, 3),
(7, 3),
(8, 2),
(9, 3),
(10, 2),
(11, 3),
(12, 4),
(13, 1),
(14, 5),
(15, 5);