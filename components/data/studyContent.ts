
export type CardType = 'FLASHCARD' | 'QUIZ';

export interface StudyCard {
    id: string;
    type: CardType;
    category: 'CLOUD_CONCEPTS' | 'SECURITY' | 'TECHNOLOGY' | 'BILLING' | 'SEC_RESILIENCE' | 'SAP_PROFESSIONAL' | 'SECURITY_SPECIALTY';
    question: string;
    answer?: string; // For Flashcards
    options?: string[]; // For Quiz
    correctOptionIndex?: number; // For Quiz
    explanation?: string;
}

export const PHASE_1_CONTENT: StudyCard[] = [
    // --- CLOUD CONCEPTS (25 Cards) ---
    {
        id: 'cc-1',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'What is Cloud Computing?',
        answer: 'The on-demand delivery of IT resources over the Internet with pay-as-you-go pricing.',
        explanation: 'Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an on-demand basis from a cloud provider like AWS.'
    },
    {
        id: 'cc-2',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'Which of the following is a benefit of Cloud Computing?',
        options: ['Trade capital expense for variable expense', 'Massive economies of scale', 'Stop guessing capacity', 'All of the above'],
        correctOptionIndex: 3,
        explanation: 'Six advantages of cloud computing are: Trade capital expense for variable expense, Benefit from massive economies of scale, Stop guessing capacity, Increase speed and agility, Stop spending money running and maintaining data centers, Go global in minutes.'
    },
    {
        id: 'cc-3',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'Define "High Availability".',
        answer: 'Accessible when you need it. Systems are designed to operate continuously without failure for a long time.',
        explanation: 'High availability ensures that your application remains accessible even if some underlying components fail.'
    },
    {
        id: 'cc-4',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'What deployment model allows you to run your application on-premises while using cloud resources for bursting?',
        options: ['Public Cloud', 'Private Cloud', 'Hybrid Cloud', 'Multi-Cloud'],
        correctOptionIndex: 2,
        explanation: 'Hybrid cloud connects infrastructure and applications between cloud-based resources and existing resources that are not located in the cloud, such as on-premises data centers.'
    },
    {
        id: 'cc-5',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'What is Scalability?',
        answer: 'The ability to easily increase or decrease resources (like CPU or RAM) to meet demand.',
        explanation: 'Scalability allows you to add or remove resources as your application load changes.'
    },
    {
        id: 'cc-6',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'Define "Elasticity".',
        answer: 'The ability to automatically scale resources out and in based on demand. You pay only for what you use.',
        explanation: 'Unlike simple scalability (manual), elasticity is automatic and responsive to real-time shifts in demand.'
    },
    {
        id: 'cc-7',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'Which pricing model allows you to pay for compute capacity by the hour or second with no long-term commitments?',
        options: ['Reserved Instances', 'On-Demand Instances', 'Spot Instances', 'Savings Plans'],
        correctOptionIndex: 1,
        explanation: 'On-Demand Instances let you pay for compute capacity by the hour or second with no long-term commitments or upfront payments.'
    },
    {
        id: 'cc-8',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'What is Agility in the cloud?',
        answer: 'The ability to develop, test, and launch software applications quickly that drive business growth.',
        explanation: 'The cloud gives you easy access to a broad range of technologies so you can innovate faster and build nearly anything you can imagine.'
    },
    {
        id: 'cc-9',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'Explain "Global Reach".',
        answer: 'The ability to deploy your application in multiple regions around the world with just a few clicks.',
        explanation: 'This allows you to provide lower latency and a better experience for your customers at minimal cost.'
    },
    {
        id: 'cc-10',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'Which of the following creates a distinct separation of concerns where AWS manages the infrastructure and you manage the data?',
        options: ['The Shared Responsibility Model', 'The Well-Architected Framework', 'The Trusted Advisor', 'The Total Cost of Ownership'],
        correctOptionIndex: 0,
        explanation: 'Security and Compliance is a shared responsibility between AWS and the customer.'
    },
    // Adding more Cloud Concepts...
    { id: 'cc-11', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is IaaS?', answer: 'Infrastructure as a Service. Provides capability to provision processing, storage, networks, etc.', explanation: 'Example: Amazon EC2.' },
    { id: 'cc-12', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is PaaS?', answer: 'Platform as a Service. Removes the need for you to manage underlying infrastructure.', explanation: 'Example: AWS Elastic Beanstalk.' },
    { id: 'cc-13', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is SaaS?', answer: 'Software as a Service. Completed product that is run and managed by the service provider.', explanation: 'Example: Gmail, Salesforce.' },
    { id: 'cc-14', type: 'QUIZ', category: 'CLOUD_CONCEPTS', question: 'A region in AWS is composed of:', options: ['One or more Edge Locations', 'Two or more Availability Zones', 'A single Data Center', 'A collection of VPCs'], correctOptionIndex: 1, explanation: 'Each AWS Region consists of a minimum of two Availability Zones.' },
    { id: 'cc-15', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is an Availability Zone (AZ)?', answer: 'One or more discrete data centers with redundant power, networking, and connectivity.', explanation: 'AZs are isolated from failures in other AZs.' },
    { id: 'cc-16', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is an Edge Location?', answer: 'A site that CloudFront uses to cache copies of your content for faster delivery to users.', explanation: 'There are many more Edge Locations than Regions.' },
    { id: 'cc-17', type: 'QUIZ', category: 'CLOUD_CONCEPTS', question: 'Which pillar of the Well-Architected Framework focuses on running and monitoring systems for business value?', options: ['Security', 'Reliability', 'Operational Excellence', 'Cost Optimization'], correctOptionIndex: 2, explanation: 'Operational Excellence includes the ability to support development and run workloads effectively.' },
    { id: 'cc-18', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'Define "Reliability" in the Well-Architected Framework.', answer: 'The ability of a workload to perform its intended function correctly and consistently.', explanation: 'Includes recovering from infrastructure or service disruptions.' },
    { id: 'cc-19', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'Define "Performance Efficiency".', answer: 'The ability to use computing resources efficiently to meet system requirements.', explanation: 'Includes selecting the right resource types and sizes.' },
    { id: 'cc-20', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'Define "Cost Optimization".', answer: 'The ability to run systems to deliver business value at the lowest price point.', explanation: 'Includes understanding and controlling where money is being spent.' },
    { id: 'cc-21', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'Define "Security" in the Well-Architected Framework.', answer: 'The ability to protect information, systems, and assets while delivering business value.', explanation: 'Includes risk assessment and mitigation strategies.' },
    { id: 'cc-22', type: 'QUIZ', category: 'CLOUD_CONCEPTS', question: 'Which design principle advises avoiding monolithic architectures?', options: ['Scale vertically', 'Decouple your components', 'Use loose coupling', 'Both B and C'], correctOptionIndex: 3, explanation: 'Decoupling or loose coupling allows components to fail or scale independently.' },
    { id: 'cc-23', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is CapEx?', answer: 'Capital Expenditure. Upfront cost for physical assets.', explanation: 'Traditional IT requires high CapEx.' },
    { id: 'cc-24', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is OpEx?', answer: 'Operational Expenditure. Recurring costs for day-to-day business.', explanation: 'Cloud computing allows you to shift from CapEx to OpEx.' },
    { id: 'cc-25', type: 'FLASHCARD', category: 'CLOUD_CONCEPTS', question: 'What is "economies of scale"?', answer: 'The ability to do things less expensively and more efficiently when you are operating at a larger scale.', explanation: 'AWS passes these savings to customers.' },

    // --- SECURITY (25 Cards) ---
    {
        id: 'sec-1',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Who is responsible for security "OF" the cloud?',
        options: ['The Customer', 'AWS', 'A Third Party Auditor', 'The Government'],
        correctOptionIndex: 1,
        explanation: 'AWS is responsible for protecting the infrastructure that runs all the services offered in the AWS Cloud.'
    },
    {
        id: 'sec-2',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Who is responsible for security "IN" the cloud?',
        options: ['The Customer', 'AWS', 'A Third Party Auditor', 'The ISP'],
        correctOptionIndex: 0,
        explanation: 'The customer is responsible for guest OS patching, firewall configuration, and IAM management.'
    },
    {
        id: 'sec-3',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is AWS IAM?',
        answer: 'Identity and Access Management. Securely manages access to AWS services and resources.',
        explanation: 'You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources.'
    },
    {
        id: 'sec-4',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is an IAM User?',
        answer: 'An entity that you create in AWS to represent the person or application that uses it to interact with AWS.',
        explanation: 'A user consists of a name and credentials.'
    },
    {
        id: 'sec-5',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is an IAM Role?',
        answer: 'An IAM identity that you can create in your account that has specific permissions.',
        explanation: 'It is similar to a user, but is not associated with a specific person. It is assumed by anyone who needs it.'
    },
    {
        id: 'sec-6',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is the "Principle of Least Privilege"?',
        answer: 'Granting only the permissions required to perform a task.',
        explanation: 'This is a best practice to minimize security risks.'
    },
    {
        id: 'sec-7',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Which service helps you protect against DDoS attacks?',
        options: ['AWS Shield', 'AWS WAF', 'AWS Inspector', 'Both A and B'],
        correctOptionIndex: 3,
        explanation: 'AWS Shield is specifically for DDoS. AWS WAF protects against web exploits, which can include DDoS-like attacks.'
    },
    {
        id: 'sec-8',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is AWS WAF?',
        answer: 'Web Application Firewall. Protects web apps from common exploits.',
        explanation: 'Helps protect against SQL injection, cross-site scripting, etc.'
    },
    {
        id: 'sec-9',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is Amazon Inspector?',
        answer: 'An automated security assessment service that helps improve the security and compliance of applications deployed on AWS.',
        explanation: 'It assesses applications for exposure, vulnerabilities, and deviations from best practices.'
    },
    {
        id: 'sec-10',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Which services allows you to record API calls made to your AWS account?',
        options: ['AWS Config', 'AWS CloudTrail', 'Amazon CloudWatch', 'AWS X-Ray'],
        correctOptionIndex: 1,
        explanation: 'AWS CloudTrail tracks user activity and API usage.'
    },
    { id: 'sec-11', type: 'FLASHCARD', category: 'SECURITY', question: 'What is AWS Artifact?', answer: 'A central resource for compliance-related information.', explanation: 'Access security and compliance reports (like SOC, ISO).' },
    { id: 'sec-12', type: 'FLASHCARD', category: 'SECURITY', question: 'What is Amazon GuardDuty?', answer: 'A threat detection service that continuously monitors for malicious activity.', explanation: 'It uses ML to integrity protection.' },
    { id: 'sec-13', type: 'FLASHCARD', category: 'SECURITY', question: 'What is a Security Group?', answer: 'A virtual firewall for your instance to control inbound and outbound traffic.', explanation: 'It operates at the instance level.' },
    { id: 'sec-14', type: 'FLASHCARD', category: 'SECURITY', question: 'What is a NACL?', answer: 'Network Access Control List. An optional layer of security for your VPC.', explanation: 'It operates at the subnet level and is stateless.' },
    { id: 'sec-15', type: 'QUIZ', category: 'SECURITY', question: 'Which service is used to manage encryption keys?', options: ['AWS KMS', 'AWS Secrets Manager', 'AWS Shield', 'AWS Macie'], correctOptionIndex: 0, explanation: 'Key Management Service (KMS) makes it easy to create and manage cryptographic keys.' },
    { id: 'sec-16', type: 'FLASHCARD', category: 'SECURITY', question: 'What is AWS Secrets Manager?', answer: 'Helps you protect secrets needed to access your applications, services, and IT resources.', explanation: 'It enables you to rotate, manage, and retrieve database credentials, API keys, etc.' },
    { id: 'sec-17', type: 'FLASHCARD', category: 'SECURITY', question: 'What is Amazon Macie?', answer: 'A security service that uses ML to discover, classify, and protect sensitive data (PII).', explanation: 'Primarily used with S3 buckets.' },
    { id: 'sec-18', type: 'FLASHCARD', category: 'SECURITY', question: 'What is MFA?', answer: 'Multi-Factor Authentication. Requires a second form of authentication.', explanation: 'Something you know (password) + Something you have (token).' },
    { id: 'sec-19', type: 'QUIZ', category: 'SECURITY', question: 'Inherited controls in the Shared Responsibility Model are:', options: ['Controls that the customer inherits from AWS', 'Controls that AWS inherits from the customer', 'Controls that are shared', 'None of the above'], correctOptionIndex: 0, explanation: 'Physical and Environmental controls are examples of inherited controls.' },
    { id: 'sec-20', type: 'FLASHCARD', category: 'SECURITY', question: 'What are "Shared Controls"?', answer: 'Controls which apply to both the infrastructure layer and customer layers.', explanation: 'Example: Patch Management, Configuration Management.' },
    { id: 'sec-21', type: 'FLASHCARD', category: 'SECURITY', question: 'What is the AWS root user?', answer: 'The email address used to create the AWS account.', explanation: 'It has complete access to all AWS services and resources.' },
    { id: 'sec-22', type: 'FLASHCARD', category: 'SECURITY', question: 'Best practice for Root User?', answer: 'Lock it away. Do not use it for daily tasks. Enable MFA.', explanation: 'Create an IAM user for daily admin tasks.' },
    { id: 'sec-23', type: 'QUIZ', category: 'SECURITY', question: 'Where can you find AWS compliance documentation?', options: ['AWS Config', 'AWS Artifact', 'AWS Systems Manager', 'AWS Trusted Advisor'], correctOptionIndex: 1, explanation: 'Artifact provides on-demand access to AWS security and compliance reports.' },
    { id: 'sec-24', type: 'FLASHCARD', category: 'SECURITY', question: 'Which service helps protect your data in S3 from accidental deletion?', answer: 'S3 Versioning and MFA Delete.', explanation: 'Versioning keeps multiple variants of an object.' },
    { id: 'sec-25', type: 'FLASHCARD', category: 'SECURITY', question: 'What is AWS Cognito?', answer: 'Provides identity for your web and mobile applications (User Sign-up/Sign-in).', explanation: 'Handles user authentication and authorization.' },

    // --- TECHNOLOGY (30 Cards) ---
    {
        id: 'tech-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon EC2?',
        answer: 'Elastic Compute Cloud. Provides secure, resizable compute capacity in the cloud.',
        explanation: 'It is essentially a virtual server.'
    },
    {
        id: 'tech-2',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which EC2 pricing model is best for steady-state workloads?',
        options: ['On-Demand', 'Spot', 'Reserved Instances', 'Dedicated Hosts'],
        correctOptionIndex: 2,
        explanation: 'Reserved Instances provide a significant discount (up to 75%) compared to On-Demand pricing.'
    },
    {
        id: 'tech-3',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Lambda?',
        answer: 'A serverless compute service that runs your code in response to events.',
        explanation: 'You don\'t manage servers. You pay only for the compute time you consume.'
    },
    {
        id: 'tech-4',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon S3?',
        answer: 'Simple Storage Service. Object storage built to store and retrieve any amount of data.',
        explanation: 'It offers industry-leading scalability, data availability, security, and performance.'
    },
    {
        id: 'tech-5',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which S3 storage class is best for data that is rarely accessed but needs rapid access when needed?',
        options: ['S3 Standard', 'S3 Standard-IA', 'S3 Glacier', 'S3 One Zone-IA'],
        correctOptionIndex: 1,
        explanation: 'Standard-IA (Infrequent Access) is for data that is accessed less frequently, but requires rapid access when needed.'
    },
    {
        id: 'tech-6',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon EBS?',
        answer: 'Elastic Block Store. Provides block level storage volumes for use with EC2 instances.',
        explanation: 'Think of it as a hard drive attached to your server.'
    },
    {
        id: 'tech-7',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the difference between S3 and EBS?',
        answer: 'S3 is Object storage (files, images). EBS is Block storage (OS, databases).',
        explanation: 'S3 is accessed via API. EBS is mounted to an EC2 instance.'
    },
    {
        id: 'tech-8',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon VPC?',
        answer: 'Virtual Private Cloud. Lets you provision a logically isolated section of the AWS Cloud.',
        explanation: 'Allows you to launch AWS resources in a virtual network that you define.'
    },
    {
        id: 'tech-9',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which database service is a managed Relational Database Service?',
        options: ['DynamoDB', 'RDS', 'Redshift', 'ElastiCache'],
        correctOptionIndex: 1,
        explanation: 'Amazon RDS makes it easier to set up, operate, and scale a relational database (SQL).'
    },
    {
        id: 'tech-10',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon DynamoDB?',
        answer: 'A key-value and document database that delivers single-digit millisecond performance at any scale.',
        explanation: 'It is a NoSQL database, fully managed by AWS.'
    },
    { id: 'tech-11', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is ELB?', answer: 'Elastic Load Balancing. Automatically distributes incoming app traffic across multiple targets.', explanation: 'Targets can be EC2 instances, containers, IP addresses, and Lambda functions.' },
    { id: 'tech-12', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Auto Scaling?', answer: 'Monitors your applications and automatically adjusts capacity to maintain steady, predictable performance.', explanation: 'Can scale EC2 instances, DynamoDB tables, etc.' },
    { id: 'tech-13', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which service is used for caching to improve read performance?', options: ['CloudFront', 'ElastiCache', 'DAX', 'All of the above'], correctOptionIndex: 3, explanation: 'CloudFront (CDN), ElastiCache (Redis/Memcached), and DAX (DynamoDB) are all caching services.' },
    { id: 'tech-14', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon Route 53?', answer: 'A highly available and scalable cloud Domain Name System (DNS) web service.', explanation: 'It is used to route end users to Internet applications.' },
    { id: 'tech-15', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon CloudFront?', answer: 'A fast content delivery network (CDN) service that securely delivers data, videos, apps to customers globally.', explanation: 'It uses Edge Locations to reduce latency.' },
    { id: 'tech-16', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS CloudFormation?', answer: 'Infrastructure as Code. Allows you to model and provision all your cloud infrastructure resources.', explanation: 'You use a template file (JSON/YAML) to define resources.' },
    { id: 'tech-17', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon SNS?', answer: 'Simple Notification Service. A fully managed messaging service for both A2A and A2P.', explanation: 'Pub/Sub model (Topics).' },
    { id: 'tech-18', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon SQS?', answer: 'Simple Queue Service. Fully managed message queuing service.', explanation: 'Decouples and scales microservices, distributed systems, and serverless apps.' },
    { id: 'tech-19', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which service is primarily used for data warehousing?', options: ['RDS', 'DynamoDB', 'Redshift', 'Athena'], correctOptionIndex: 2, explanation: 'Amazon Redshift is a fast, simple, cost-effective data warehousing service.' },
    { id: 'tech-20', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon Athena?', answer: 'An interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.', explanation: 'Serverless, no infrastructure to manage.' },
    { id: 'tech-21', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Elastic Beanstalk?', answer: 'Service for deploying and scaling web applications and services.', explanation: 'You upload your code and Elastic Beanstalk handles the deployment.' },
    { id: 'tech-22', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon EFS?', answer: 'Elastic File System. A simple, serverless, set-and-forget, elastic file system.', explanation: 'Used with AWS Cloud services and on-premises resources (NFS).' },
    { id: 'tech-23', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Direct Connect?', answer: 'A cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS.', explanation: 'Bypasses the public internet.' },
    { id: 'tech-24', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Storage Gateway?', answer: 'Hybrid cloud storage service that gives on-premises access to virtually unlimited cloud storage.', explanation: 'Connects on-prem apps to cloud storage.' },
    { id: 'tech-25', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which service allows you to run containerized applications?', options: ['ECS', 'EKS', 'Fargate', 'All of the above'], correctOptionIndex: 3, explanation: 'ECS (Elastic Container Service), EKS (Kubernetes), and Fargate (Serverless compute for containers).' },
    { id: 'tech-26', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is an AMI?', answer: 'Amazon Machine Image. Provides the information required to launch an instance.', explanation: 'Includes the OS, app server, and applications.' },
    { id: 'tech-27', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Instance Store?', answer: 'Temporary, block-level storage for your instance.', explanation: 'Data is lost if the instance stops or terminates (Ephemeral).' },
    { id: 'tech-28', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Glue?', answer: 'A serverless data integration service (ETL) that makes it easy to discover, prepare, and combine data.', explanation: 'Extract, Transform, Load.' },
    { id: 'tech-29', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS DMS?', answer: 'Database Migration Service. Helps you migrate databases to AWS quickly and securely.', explanation: 'Source database remains fully operational during migration.' },
    { id: 'tech-30', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon Aurora?', answer: 'A relational database engine compatible with MySQL and PostgreSQL.', explanation: 'Up to 5x faster than standard MySQL.' },

    // --- BILLING & PRICING (20 Cards) ---
    {
        id: 'bill-1',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which tool provides real-time guidance to help you provision your resources following best practices?',
        options: ['AWS Trusted Advisor', 'AWS Inspector', 'Cost Explorer', 'AWS Budgets'],
        correctOptionIndex: 0,
        explanation: 'Trusted Advisor inspects your AWS environment and makes recommendations for saving money, improving performance, etc.'
    },
    {
        id: 'bill-2',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is AWS Cost Explorer?',
        answer: 'A tool that enables you to visualize, understand, and manage your AWS costs and usage over time.',
        explanation: 'You can view data for up to the last 12 months.'
    },
    {
        id: 'bill-3',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What are AWS Budgets?',
        answer: 'Gives you the ability to set custom budgets that alert you when your costs or usage exceed your budgeted amount.',
        explanation: 'You can set budgets for cost, usage, RIC, and Savings Plans.'
    },
    {
        id: 'bill-4',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which support plan offers 24/7 access to Cloud Support Engineers via phone, chat, and email?',
        options: ['Basic', 'Developer', 'Business', 'Enterprise'],
        correctOptionIndex: 2,
        explanation: 'Business (and Enterprise) offer 24/7 access. Developer is business hours email access.'
    },
    {
        id: 'bill-5',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is TCO?',
        answer: 'Total Cost of Ownership. A financial estimate to help you determine the direct and indirect costs of a product or system.',
        explanation: 'AWS offers a TCO Calculator to compare on-prem vs cloud costs.'
    },
    {
        id: 'bill-6',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is AWS Organizations?',
        answer: 'Helps you centrally manage and govern your environment as you grow and scale your AWS resources.',
        explanation: 'Key feature: Consolidated Billing.'
    },
    {
        id: 'bill-7',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is Consolidated Billing?',
        answer: 'A feature of AWS Organizations that allows you to pay for all your member accounts with one bill.',
        explanation: 'You can also get volume discounts by combining usage.'
    },
    {
        id: 'bill-8',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is a "Tag" in AWS?',
        answer: 'A label that you or AWS assigns to an AWS resource. Each tag consists of a key and a value.',
        explanation: 'Crucial for cost allocation and organization.'
    },
    {
        id: 'bill-9',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which tool allows you to estimate the cost of your architecture solution?',
        options: ['AWS Pricing Calculator', 'AWS Cost Explorer', 'AWS Budgets', 'TCO Calculator'],
        correctOptionIndex: 0,
        explanation: 'The Pricing Calculator lets you estimate the cost of AWS services for your specific solution.'
    },
    {
        id: 'bill-10',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is the AWS Free Tier?',
        answer: 'Offers users a chance to explore and try out AWS services free of charge up to specified limits.',
        explanation: 'Types: Always Free, 12 Months Free, Trials.'
    },
    { id: 'bill-11', type: 'FLASHCARD', category: 'BILLING', question: 'What is an Enterprise Support feature?', answer: 'Designated Technical Account Manager (TAM) and 15-minute response time for Business-critical system down.', explanation: 'The highest tier of support.' },
    { id: 'bill-12', type: 'FLASHCARD', category: 'BILLING', question: 'How is S3 charged?', answer: 'Storage (GB), Requests, Data Transfer Out, Management features.', explanation: 'Data Transfer In is typically free.' },
    { id: 'bill-13', type: 'FLASHCARD', category: 'BILLING', question: 'How is EC2 charged (On-Demand)?', answer: 'Per second or per hour depending on the OS.', explanation: 'You pay for compute capacity.' },
    { id: 'bill-14', type: 'FLASHCARD', category: 'BILLING', question: 'What is a Cost Allocation Tag?', answer: 'A tag that you activate in the Billing and Cost Management console to track costs.', explanation: 'They appear in the Cost Explorer and cost allocation report.' },
    { id: 'bill-15', type: 'QUIZ', category: 'BILLING', question: 'Which pricing factor is NOT typically used for AWS services?', options: ['Compute time', 'Storage amount', 'Data transfer in', 'Data transfer out'], correctOptionIndex: 2, explanation: 'Data transfer INTO AWS is generally free.' },
    { id: 'bill-16', type: 'FLASHCARD', category: 'BILLING', question: 'What is a Savings Plan?', answer: 'A flexible pricing model that offers low prices on EC2, Lambda, and Fargate usage.', explanation: 'Requires 1-year or 3-year commitment ($/hr).' },
    { id: 'bill-17', type: 'FLASHCARD', category: 'BILLING', question: 'What is "pay-as-you-go"?', answer: 'You pay only for the individual services you need, for as long as you use them.', explanation: 'No long-term contracts required.' },
    { id: 'bill-18', type: 'FLASHCARD', category: 'BILLING', question: 'What is the AWS Marketplace?', answer: 'A digital catalog with thousands of software listings from independent software vendors.', explanation: 'Find, buy, and deploy software.' },
    { id: 'bill-19', type: 'FLASHCARD', category: 'BILLING', question: 'What is a "concierge" support team?', answer: 'Included in Enterprise Support, they assist with billing and account inquiries.', explanation: 'Non-technical billing support.' },
    { id: 'bill-20', type: 'FLASHCARD', category: 'BILLING', question: 'Limit Increase?', answer: 'You can request a quota increase via the Service Quotas console or Support Center.', explanation: 'Some limits are soft and can be increased.' },
    // --- HIGH-FIDELITY EXAM RECALL (20 Additional Cards) ---
    {
        id: 'hf-1-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the primary function of AWS DMS?',
        answer: 'To migrate databases to AWS while keeping the source database operational.',
        explanation: 'Supports both homogeneous and heterogeneous migrations with minimal downtime.'
    },
    {
        id: 'hf-1-2',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which dashboard provides personalized alerts for AWS service outages affecting your account?',
        options: ['Service Health Dashboard', 'Account Health Dashboard', 'Trusted Advisor', 'CloudWatch'],
        correctOptionIndex: 1,
        explanation: 'Account Health (part of AWS Health Dashboard) shows alerts specific to your resources, while Service Health is global.'
    },
    {
        id: 'hf-1-3',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'Under the Shared Responsibility Model, who patches the Guest OS on EC2?',
        answer: 'The Customer.',
        explanation: 'AWS manages the virtualization layer and hardware; the customer manages everything from the OS up.'
    },
    {
        id: 'hf-1-4',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which EC2 instance type is most cost-effective for interruptible batch jobs?',
        options: ['On-Demand', 'Reserved', 'Spot', 'Dedicated'],
        correctOptionIndex: 2,
        explanation: 'Spot instances offer massive discounts for workloads that can handle interruptions.'
    },
    {
        id: 'hf-1-5',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What service enables consolidated billing across multiple accounts?',
        answer: 'AWS Organizations.',
        explanation: 'It provides central management, policy control, and unified billing for all accounts in the Org.'
    },
    {
        id: 'hf-1-6',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'How does Compute Savings Plans differ from EC2 Instance Savings Plans?',
        answer: 'Compute Savings Plans apply to EC2, Lambda, and Fargate across any region/family.',
        explanation: 'EC2 Instance Savings Plans provide more savings but are limited to a specific instance family in a region.'
    },
    {
        id: 'hf-1-7',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'Which AWS CAF perspective focuses on business priorities and IT strategy alignment?',
        options: ['Governance', 'Business', 'Operations', 'Security'],
        correctOptionIndex: 1,
        explanation: 'The Business Perspective ensures that IT investments support business outcomes.'
    },
    {
        id: 'hf-1-8',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the "Serverless" advantage of Amazon Athena?',
        answer: 'Query data directly in S3 using SQL without loading it into a database.',
        explanation: 'You only pay for the queries you run (per GB scanned).'
    },
    {
        id: 'hf-1-9',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is the purpose of Amazon Macie?',
        answer: 'To automatically discover, classify, and protect sensitive data (PII) in S3.',
        explanation: 'Uses machine learning to identify patterns like credit card numbers or credentials.'
    },
    {
        id: 'hf-1-10',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Which service tracks resource configuration changes over time for compliance?',
        options: ['CloudTrail', 'AWS Config', 'Inspector', 'Trusted Advisor'],
        correctOptionIndex: 1,
        explanation: 'AWS Config records configuration history and alerts on compliance vs rules.'
    },
    {
        id: 'hf-1-11',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is the difference between Security Groups and NACLs regarding "State"?',
        answer: 'Security Groups are Stateful; NACLs are Stateless.',
        explanation: 'SG returns are automatically allowed. NACLs need explicit rules for both directions.'
    },
    {
        id: 'hf-1-12',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'Explain the "Pay-as-you-go" pricing model.',
        answer: 'Pay only for what you use with no long-term contracts or upfront costs.',
        explanation: 'Allows businesses to scale costs with usage and avoid over-provisioning.'
    },
    {
        id: 'hf-1-13',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which support plan includes a Technical Account Manager (TAM)?',
        options: ['Developer', 'Business', 'Enterprise', 'Basic'],
        correctOptionIndex: 2,
        explanation: 'TAM is a designated resource available only at the Enterprise tier.'
    },
    {
        id: 'hf-1-14',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Global Accelerator?',
        answer: 'Uses Anycast IPs and the AWS Global Network to route traffic to regional endpoints.',
        explanation: 'Improves performance by up to 60% by avoiding internet congestion.'
    },
    {
        id: 'hf-1-15',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the main use case for AWS Marketplace?',
        answer: 'To find, test, and buy 3rd-party software that runs on AWS.',
        explanation: 'Simplifies procurement and billing for partner solutions.'
    },
    {
        id: 'hf-1-16',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which EC2 family is optimized for "high performance processors"?',
        options: ['M Series', 'C Series', 'R Series', 'I Series'],
        correctOptionIndex: 1,
        explanation: 'C-family (Compute) is designed for CPU-intensive workloads like batch processing.'
    },
    {
        id: 'hf-1-17',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What tool helps estimate migration TCO (Total Cost of Ownership)?',
        answer: 'AWS Migration Evaluator.',
        explanation: 'Analyzes on-premises utilization to build a business case for cloud migration.'
    },
    {
        id: 'hf-1-18',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'Where can you find official AWS ISO and SOC reports?',
        answer: 'AWS Artifact.',
        explanation: 'It is a self-service portal for security and compliance documentation.'
    },
    {
        id: 'hf-1-19',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which database is fully managed, serverless NoSQL?',
        options: ['RDS', 'Aurora', 'DynamoDB', 'Redshift'],
        correctOptionIndex: 2,
        explanation: 'DynamoDB is the primary serverless NoSQL database on AWS.'
    },
    {
        id: 'hf-1-20',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'Explain the "Cloud Advantage" of Economies of Scale.',
        answer: 'AWS has lower costs because they serve hundreds of thousands of customers.',
        explanation: 'Savings are passed to customers in the form of regular price reductions.'
    },
    {
        id: 'hf-1-21',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon AppStream 2.0?',
        answer: 'A fully managed non-persistent application and desktop streaming service.',
        explanation: 'Allows users to access desktop applications from any device via a browser.'
    },
    {
        id: 'hf-1-22',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which tool provides recommendations to optimize EC2 instance sizes to save costs?',
        options: ['Cost Explorer', 'AWS Compute Optimizer', 'Trusted Advisor', 'Budgets'],
        correctOptionIndex: 1,
        explanation: 'Compute Optimizer uses machine learning to recommend the optimal AWS resources for your workloads.'
    },
    {
        id: 'hf-1-23',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is the purpose of AWS Network Firewall?',
        answer: 'To provide high-availability network security for your VPCs with intrusion prevention.',
        explanation: 'Unlike WAF (L7), Network Firewall can filter L3-L7 traffic at the VPC level.'
    },
    {
        id: 'hf-1-24',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What does AWS Outposts provide?',
        answer: 'AWS infrastructure and services on-premises for a truly consistent hybrid experience.',
        explanation: 'Allows you to run AWS services in your own data center for low-latency/local processing.'
    },
    {
        id: 'hf-1-25',
        type: 'QUIZ',
        category: 'CLOUD_CONCEPTS',
        question: 'Which Pillar of the Well-Architected Framework focuses on using computing resources efficiently?',
        options: ['Operational Excellence', 'Security', 'Performance Efficiency', 'Cost Optimization'],
        correctOptionIndex: 2,
        explanation: 'Performance Efficiency is about maintaining efficiency as demand changes and technologies evolve.'
    },
    {
        id: 'hf-1-26',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the main benefit of AWS Fargate?',
        answer: 'Serverless compute for containers; you don\'t manage EC2 instances.',
        explanation: 'Fargate removes the operational overhead of scaling and patching servers.'
    },
    {
        id: 'hf-1-27',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What does Amazon Inspector scan for?',
        answer: 'Software vulnerabilities and unintended network exposure on EC2 and ECR.',
        explanation: 'Automates security assessments based on the latest vulnerability databases.'
    },
    {
        id: 'hf-1-28',
        type: 'QUIZ',
        category: 'BILLING',
        question: 'Which AWS support plan provides a 15-minute response time for critical system failures?',
        options: ['Business', 'Developer', 'Enterprise', 'Basic'],
        correctOptionIndex: 2,
        explanation: 'Enterprise Support provides the fastest response times (15m for business-critical system down).'
    },
    {
        id: 'hf-1-29',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the primary use of AWS Glue?',
        answer: 'Serverless data integration (ETL) service to prepare data for analytics.',
        explanation: 'Automates the discovery, preparation, and combination of data from multiple sources.'
    },
    {
        id: 'hf-1-30',
        type: 'FLASHCARD',
        category: 'SECURITY',
        question: 'What is the "root user" best practice?',
        answer: 'Enable MFA and stop using it for everyday tasks; use IAM instead.',
        explanation: 'The root user has unrestricted access; protecting it is critical for account security.'
    },
    {
        id: 'hf-1-31',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which service enables developers to build, train, and deploy machine learning models quickly?',
        options: ['Amazon Comprehend', 'Amazon SageMaker', 'Amazon Rekognition', 'Amazon Lex'],
        correctOptionIndex: 1,
        explanation: 'SageMaker is the comprehensive platform for the entire ML lifecycle.'
    },
    {
        id: 'hf-1-32',
        type: 'FLASHCARD',
        category: 'BILLING',
        question: 'What is the AWS Cost and Usage Report (CUR)?',
        answer: 'The most detailed AWS cost data available, including resource metadata.',
        explanation: 'Provides line-item detail at the hourly or daily level, can be queried with Athena.'
    },
    {
        id: 'hf-1-33',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon CloudFront?',
        answer: 'A Content Delivery Network (CDN) that delivers data with low latency via edge locations.',
        explanation: 'Speeds up distribution of static and dynamic web content to global users.'
    },
    {
        id: 'hf-1-34',
        type: 'QUIZ',
        category: 'SECURITY',
        question: 'Which AWS service helps protect apps against DDoS attacks for FREE by default?',
        options: ['AWS Shield Standard', 'AWS Shield Advanced', 'AWS WAF', 'AWS Firewall Manager'],
        correctOptionIndex: 0,
        explanation: 'Shield Standard is automatically enabled for all AWS customers at no extra cost.'
    },
    {
        id: 'hf-1-35',
        type: 'FLASHCARD',
        category: 'CLOUD_CONCEPTS',
        question: 'What does "High Availability" mean?',
        answer: 'The system is designed to be operational and accessible for a high percentage of time.',
        explanation: 'Typically achieved via Multi-AZ deployments and redundant components.'
    }
];
