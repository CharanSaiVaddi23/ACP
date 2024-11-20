-- Table for Student 
CREATE TABLE Student (
    SRN VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Email VARCHAR(50)
);

-- Table for Alumni
CREATE TABLE Alumni (
    SRN VARCHAR(20) PRIMARY KEY,
    Name VARCHAR(50),
    JobRole VARCHAR(50),
    Company VARCHAR(50),
    Email VARCHAR(50)
);

-- Table for Notification
CREATE TABLE Notification (
    Not_Id INT PRIMARY KEY,
    Content TEXT,
    Timestamp DATETIME,
    Student_SRN VARCHAR(20),
    Alumni_SRN VARCHAR(20),
    FOREIGN KEY (Student_SRN) REFERENCES Student(SRN),
    FOREIGN KEY (Alumni_SRN) REFERENCES Alumni(SRN)
);

-- Table for Event
CREATE TABLE Event (
    Event_Id INT PRIMARY KEY,
    Title VARCHAR(100),
    Description TEXT,
    Contact_Info VARCHAR(50)
);

-- Table for Feedback
CREATE TABLE Feedback (
    F_Id INT PRIMARY KEY,
    Content TEXT,
    Date DATE,
    Stud_SRN VARCHAR(20),
    FOREIGN KEY (Stud_SRN) REFERENCES Student(SRN)
);

-- Table for Profile
CREATE TABLE Profile (
    Profile_Id INT PRIMARY KEY,
    Bio TEXT,
    ProfilePic VARCHAR(255),
    Contact_Info VARCHAR(50),
    Student_SRN VARCHAR(20),
    Alumni_SRN VARCHAR(20),
    FOREIGN KEY (Student_SRN) REFERENCES Student(SRN),
    FOREIGN KEY (Alumni_SRN) REFERENCES Alumni(SRN)
);

-- Table for Interaction
CREATE TABLE Interaction (
    Message_Id INT PRIMARY KEY,
    MessageContent TEXT,
    Date DATE,
    Student_SRN VARCHAR(20),
    Alumni_SRN VARCHAR(20),
    FOREIGN KEY (Student_SRN) REFERENCES Student(SRN),
    FOREIGN KEY (Alumni_SRN) REFERENCES Alumni(SRN)
);

-- Table for Participation
CREATE TABLE Participation (
    SRN VARCHAR(20),
    Event_Id INT,
    Attendance_Status VARCHAR(20),
    PRIMARY KEY (SRN, Event_Id),
    FOREIGN KEY (SRN) REFERENCES Student(SRN),
    FOREIGN KEY (Event_Id) REFERENCES Event(Event_Id)
);

-- Table for Post
CREATE TABLE Post (
    A_SRN VARCHAR(20),
    Event_Id INT,
    Post_Date DATE,
    PRIMARY KEY (A_SRN, Event_Id),
    FOREIGN KEY (A_SRN) REFERENCES Alumni(SRN),
    FOREIGN KEY (Event_Id) REFERENCES Event(Event_Id)
);
