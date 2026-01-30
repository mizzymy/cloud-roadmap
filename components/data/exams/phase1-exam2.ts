
import { ExamDefinition } from './types';

export const PHASE_1_EXAM_2: ExamDefinition = {
    id: 'clf-c02-exam-2',
    title: 'AWS Cloud Practitioner - Exam 2 (Real Practice)',
    code: 'CLF-C02',
    description: 'High-fidelity mock exam covering Advanced Topics: Savings Plans, Global Accelerator, CAF, and Support Plans. Sourced from high-quality practice sets.',
    timeLimitMinutes: 30,
    passingScore: 700,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company has a global user base and needs to provide low-latency access to an application hosted in a single AWS Region. They need to improve the availability and performance of the application by using the AWS global network to route traffic to the nearest regional endpoint via Anycast IP addresses. Which service should they use?',
            options: ['Amazon CloudFront', 'AWS Global Accelerator', 'Amazon Route 53', 'AWS Direct Connect'],
            correctAnswer: 1,
            explanation: 'AWS Global Accelerator uses the AWS global network to optimize the path from your users to your applications, improving the performance of your TCP and UDP traffic. It provides static IP addresses that act as a fixed entry point.',
            distractorExplanation: 'CloudFront is for caching content (CDN). Route 53 is DNS. Direct Connect is for private connectivity from on-premises.'
        },
        {
            id: 'q2',
            scenario: 'A startup is looking to reduce their monthly AWS bill. They are willing to commit to a consistent amount of compute usage (e.g., $10/hour) for a 1-year or 3-year term. Which pricing model would provide the most flexibility across different EC2 instance families and even Fargate or Lambda?',
            options: ['EC2 Reserved Instances', 'On-Demand Instances', 'Savings Plans', 'Spot Instances'],
            correctAnswer: 2,
            explanation: 'Compute Savings Plans provide the most flexibility, offering up to 66% savings (similar to RIs) but applying automatically to EC2 instance usage regardless of instance family, size, AZ, Region, OS, or tenancy. They also apply to Fargate and Lambda.',
            distractorExplanation: 'Reserved Instances are less flexible (often tied to family/region). Spot Instances are not for committed consistent usage (can be interrupted).'
        },
        {
            id: 'q3',
            scenario: 'Which AWS service should a Cloud Practitioner use to track the compliance of AWS resource configurations against internal guidelines and best practices, such as ensuring all S3 buckets have encryption enabled?',
            options: ['AWS CloudTrail', 'AWS Config', 'Amazon Inspector', 'AWS Trusted Advisor'],
            correctAnswer: 1,
            explanation: 'AWS Config is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources against desired configurations (Config Rules).',
            distractorExplanation: 'CloudTrail tracks API activity. Inspector scans for vulnerabilities. Trusted Advisor provides optimization recommendations.'
        },
        {
            id: 'q4',
            scenario: 'A developer needs to give an application running on an Amazon EC2 instance permission to access an Amazon S3 bucket. What is the AWS-recommended best practice for granting these permissions?',
            options: ['Create an IAM User, generate access keys, and hard-code them into the application.', 'Create an IAM Role with the necessary permissions and attach it to the EC2 instance.', 'Use the AWS Root Account credentials to ensure the application has full access.', 'Store the IAM User credentials in a public GitHub repository for easy deployment.'],
            correctAnswer: 1,
            explanation: 'The best practice is to use IAM Roles. When you attach a role to an EC2 instance, AWS automatically provides temporary security credentials to the application.',
            distractorExplanation: 'Hard-coding keys is a security risk. Root credentials should never be used. Public repos expose credentials.'
        },
        {
            id: 'q5',
            scenario: 'A company has a massive dataset of historical sales data stored in Amazon S3 in Parquet format. A data analyst needs to run complex SQL queries against this data occasionally without moving it into a dedicated database. Which service is the most cost-effective and efficient for this task?',
            options: ['Amazon Redshift', 'Amazon Athena', 'Amazon RDS', 'Amazon DynamoDB'],
            correctAnswer: 1,
            explanation: 'Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. It is serverless and pay-per-query.',
            distractorExplanation: 'Redshift requires a cluster. RDS requires data import. DynamoDB is NoSQL.'
        },
        {
            id: 'q6',
            scenario: 'Which feature of Amazon CloudWatch allows a user to automatically perform an action, such as sending an SNS notification or stopping an EC2 instance, when a specific threshold is met for a metric?',
            options: ['CloudWatch Logs', 'CloudWatch Alarms', 'CloudWatch Metrics', 'CloudWatch Dashboards'],
            correctAnswer: 1,
            explanation: 'CloudWatch Alarms watch a single metric over a specified time period and perform one or more specified actions based on the value relative to a threshold.',
            distractorExplanation: 'Logs collect data. Metrics store data. Dashboards visualize data.'
        },
        {
            id: 'q7',
            scenario: 'A company wants to find, buy, and immediately start using third-party software that runs on AWS, such as pre-configured machine learning models or security appliances. Where should they look?',
            options: ['AWS Artifact', 'AWS Marketplace', 'Amazon AppStream 2.0', 'AWS CodeCommit'],
            correctAnswer: 1,
            explanation: 'AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors that make it easy to find, test, buy, and deploy software that runs on AWS.',
            distractorExplanation: 'Artifact is for compliance reports. AppStream is for streaming apps. CodeCommit is source control.'
        },
        {
            id: 'q8',
            scenario: 'A large enterprise has an AWS Enterprise Support plan. They are planning a major data center migration to AWS and need architectural guidance and a designated person to help coordinate their support needs. Who is the primary point of contact provided under this plan?',
            options: ['AWS Solutions Architect', 'Technical Account Manager (TAM)', 'AWS Concierge', 'AWS Trusted Advisor'],
            correctAnswer: 1,
            explanation: 'The Enterprise Support plan includes a designated Technical Account Manager (TAM) who provides architectural guidance and operational support.',
            distractorExplanation: 'Solutions Architects are not designated point-of-contacts in support plans. Concierge is for billing. Trusted Advisor is a tool.'
        },
        {
            id: 'q9',
            scenario: 'An IT manager needs to estimate the cost of moving a suite of on-premises servers to AWS. They specifically want to compare the cost of their current on-premises data center (including hardware, power, and cooling) against the cost of running those workloads on AWS. Which tool is best suited for this?',
            options: ['AWS Pricing Calculator', 'AWS Migration Evaluator', 'AWS Budgets', 'AWS Cost Explorer'],
            correctAnswer: 1,
            explanation: 'AWS Migration Evaluator (formerly TCO Calculator) creates a business case for cloud migration by estimating the Total Cost of Ownership (TCO) on AWS based on your actual utilization.',
            distractorExplanation: 'Pricing Calculator estimates AWS service costs but doesn\'t analyze on-prem TCO. Budgets and Cost Explorer are for existing AWS spend.'
        },
        {
            id: 'q10',
            scenario: 'When a company is choosing an AWS Region for their new application, which of the following is NOT a valid factor to consider?',
            options: ['Data Sovereignty and Compliance laws.', 'Proximity to customers to minimize latency.', 'Availability of specific AWS services and features.', 'The number of IAM users created in the account.'],
            correctAnswer: 3,
            explanation: 'IAM users are global resources and do not affect which region you should choose.',
            distractorExplanation: 'Data sovereignty, latency, and service availability are critical region selection factors.'
        },
        {
            id: 'q11',
            scenario: 'In the AWS Cloud Adoption Framework (CAF), which perspective focuses on evolving the organization\'s ability to efficiently deliver cloud-native solutions, including infrastructure protection, data protection, and incident response?',
            options: ['Governance Perspective', 'Operations Perspective', 'Security Perspective', 'Platform Perspective'],
            correctAnswer: 2,
            explanation: 'The Security Perspective of the AWS CAF focuses on ensuring your cloud workloads meet security and compliance requirements (identity, protection, response).',
            distractorExplanation: 'Governance is management/risk. Operations is monitoring. Platform is architecture.'
        },
        {
            id: 'q12',
            scenario: 'A company needs to protect its sensitive data in S3 from being accidentally made public. Which AWS service uses machine learning to automatically discover, classify, and protect sensitive data such as PII?',
            options: ['Amazon GuardDuty', 'AWS Shield', 'Amazon Macie', 'AWS WAF'],
            correctAnswer: 2,
            explanation: 'Amazon Macie is a fully managed data security service that uses ML to discover and protect sensitive data (like PII) in Amazon S3.',
            distractorExplanation: 'GuardDuty is threat detection. Shield is DDoS. WAF is web firewall.'
        },
        {
            id: 'q13',
            scenario: 'Which AWS service provides an intelligent threat detection system that continuously monitors your AWS accounts, workloads, and data stored in S3 for malicious activity, such as cryptomining or unusual API calls?',
            options: ['Amazon Inspector', 'Amazon GuardDuty', 'AWS Trusted Advisor', 'AWS Config'],
            correctAnswer: 1,
            explanation: 'Amazon GuardDuty is an intrusion detection service that monitors for malicious activity and unauthorized behavior using ML and threat intelligence.',
            distractorExplanation: 'Inspector scans software vulnerabilities. Trusted Advisor is optimization. Config is compliance.'
        },
        {
            id: 'q14',
            scenario: 'Under the AWS Shared Responsibility Model, which of the following is the responsibility of the CUSTOMER when using Amazon RDS?',
            options: ['Patching the underlying operating system.', 'Managing the physical security of the data center.', 'Managing database user permissions and access.', 'Replacing failed hardware in the database server.'],
            correctAnswer: 2,
            explanation: 'In RDS (a Managed Service), AWS handles OS patching and hardware. The customer is responsible for "Security IN the Cloud" (DB access, data).',
            distractorExplanation: 'OS patching and hardware are AWS responsibilities.'
        },
        {
            id: 'q15',
            scenario: 'A company needs to access their official AWS compliance reports, such as the SOC 1, SOC 2, and ISO 27001 certifications, to share with their auditors. Which AWS service should they use?',
            options: ['AWS Secrets Manager', 'AWS Systems Manager', 'AWS Artifact', 'AWS CloudTrail'],
            correctAnswer: 2,
            explanation: 'AWS Artifact is the central resource for accessing AWS security and compliance reports.',
            distractorExplanation: 'Secrets Manager stores secrets. Systems Manager manages resources. CloudTrail logs APIs.'
        },
        {
            id: 'q16',
            scenario: 'What is the primary difference between the AWS Health Dashboard (Service Health) and the AWS Health Dashboard (Account Health)?',
            options: ['Service Health shows the status of AWS services globally; Account Health shows the status of services specifically affecting your account.', 'Service Health is for technical users; Account Health is for billing users.', 'Service Health requires a support plan; Account Health is free for everyone.', 'There is no difference.'],
            correctAnswer: 0,
            explanation: 'Service Health is the public global view. Account Health (Personal Health Dashboard) provides alerts relevant to your specific resources.',
            distractorExplanation: 'Both are technical/free (basic features).'
        },
        {
            id: 'q17',
            scenario: 'A company wants to set up an alert that notifies them if their monthly AWS spending is projected to exceed $500. Which tool should they use?',
            options: ['AWS Cost Explorer', 'AWS Budgets', 'AWS Pricing Calculator', 'AWS Trusted Advisor'],
            correctAnswer: 1,
            explanation: 'AWS Budgets allows you to set custom budgets and alerts based on cost or usage thresholds.',
            distractorExplanation: 'Cost Explorer is for analysis. Pricing Calc is for estimation. Trusted Advisor provides standard checks.'
        },
        {
            id: 'q18',
            scenario: 'Which AWS service is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development (ETL)?',
            options: ['AWS Glue', 'Amazon Kinesis', 'Amazon Redshift', 'Amazon Athena'],
            correctAnswer: 0,
            explanation: 'AWS Glue is a fully managed serverless ETL (Extract, Transform, Load) service.',
            distractorExplanation: 'Kinesis is streaming. Redshift is warehousing. Athena is querying.'
        },
        {
            id: 'q19',
            scenario: 'A user is confused by EC2 instance families. They need an instance that is optimized for high-performance processors and is ideal for batch processing workloads. Which instance family should they look for?',
            options: ['R series', 'C series', 'M series', 'I series'],
            correctAnswer: 1,
            explanation: 'C series (Compute Optimized) are ideal for compute-intensive workloads.',
            distractorExplanation: 'R is Memory. M is General Purpose. I is Storage (I/O) Optimized.'
        },
        {
            id: 'q20',
            scenario: 'Which of the following is a core principle of the AWS Cloud Adoption Framework (CAF) "People" perspective?',
            options: ['Managing the cloud budget and costs.', 'Bridging the gap between technology and business by focusing on skills, leadership, and organization.', 'Ensuring data encryption and network security.', 'Optimizing the performance of EC2 instances.'],
            correctAnswer: 1,
            explanation: 'The People perspective focuses on organizational structures, leadership, and culture/skills.',
            distractorExplanation: 'Costs is Governance. Security is Security. Performance is Operations/Platform.'
        }
    ]
};
