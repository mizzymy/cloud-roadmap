
import { ExamDefinition } from './types';

export const PHASE_1_EXAM_1: ExamDefinition = {
    id: 'clf-c02-exam-1',
    title: 'AWS Cloud Practitioner - Exam 1 (Real Practice)',
    code: 'CLF-C02',
    description: 'High-fidelity mock exam focusing on Cloud Concepts, Billing, and Global Infrastructure. Sourced from high-quality practice sets.',
    timeLimitMinutes: 30,
    passingScore: 700,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company wants to migrate its on-premises Oracle database to AWS but must ensure the database remains available during the migration process. Which AWS service should they use?',
            options: ['AWS DataSync', 'AWS Database Migration Service (AWS DMS)', 'AWS Snowball Edge', 'Amazon RDS'],
            correctAnswer: 1,
            explanation: 'AWS DMS supports near-zero downtime migrations by keeping the source database operational while replicating data to the target.',
            distractorExplanation: 'DataSync is for file/object storage, Snowball is for offline petabyte-scale transfers, and RDS is the destination service, not the migration tool.'
        },
        {
            id: 'q2',
            scenario: 'Which AWS tool provides a "Personal Health Dashboard" that alerts users when specific AWS services they are using are experiencing outages?',
            options: ['AWS Service Health Dashboard', 'AWS CloudWatch', 'AWS Health Dashboard', 'AWS Trusted Advisor'],
            correctAnswer: 2,
            explanation: 'The AWS Health Dashboard (formerly Personal Health Dashboard) provides a personalized view of the performance and availability of the AWS services being used by the specific account.',
            distractorExplanation: 'The Service Health Dashboard shows the general status of all services across all regions. CloudWatch is for metrics. Trusted Advisor is for optimization.'
        },
        {
            id: 'q3',
            scenario: 'Under the AWS Shared Responsibility Model, which of the following is the sole responsibility of the customer when using Amazon EC2?',
            options: ['Patching the underlying host hardware', 'Managing physical security of the data center', 'Patching the guest operating system', 'Disposing of used disk drives'],
            correctAnswer: 2,
            explanation: 'In Infrastructure as a Service (IaaS) like EC2, AWS manages the "Security OF the Cloud" (hardware, facility). The customer is responsible for "Security IN the Cloud," which includes the OS, applications, and data.',
            distractorExplanation: 'Hardware, physical security, and disk disposal are AWS responsibilities.'
        },
        {
            id: 'q4',
            scenario: 'A startup needs to run a short-lived batch processing job that can be interrupted without any data loss. Which EC2 instance purchasing option is the most cost-effective?',
            options: ['On-Demand Instances', 'Reserved Instances', 'Spot Instances', 'Dedicated Hosts'],
            correctAnswer: 2,
            explanation: 'Spot Instances offer up to 90% savings compared to On-Demand but can be reclaimed by AWS. Since the job is "short-lived" and "can be interrupted," this is the most cost-effective choice.',
            distractorExplanation: 'On-Demand is full price. Reserved requires 1-3 year commitment. Dedicated Hosts are for licensing compliance and are expensive.'
        },
        {
            id: 'q5',
            scenario: 'Which AWS service allows a user to consolidate and manage multiple AWS accounts from a central location to enable consolidated billing?',
            options: ['AWS Systems Manager', 'AWS Organizations', 'AWS Control Tower', 'AWS IAM'],
            correctAnswer: 1,
            explanation: 'AWS Organizations is specifically designed for account management and consolidated billing across multiple AWS accounts.',
            distractorExplanation: 'Control Tower sets up a landing zone but Organizations is the billing engine. Systems Manager manages instances. IAM manages users/roles.'
        },
        {
            id: 'q6',
            scenario: 'A developer wants to write and run code without provisioning or managing servers. Which AWS service provides this "Serverless" compute capability?',
            options: ['Amazon EC2', 'AWS Lambda', 'Amazon LightSail', 'AWS Fargate'],
            correctAnswer: 1,
            explanation: 'AWS Lambda is the primary serverless compute service that runs code in response to events.',
            distractorExplanation: 'EC2 and Lightsail are server-based. Fargate is serverless containers, but Lambda is the direct "run code" answer.'
        },
        {
            id: 'q7',
            scenario: 'Which AWS Cloud Adoption Framework (AWS CAF) perspective focuses on ensuring that IT investments are aligned with business priorities?',
            options: ['Governance Perspective', 'Business Perspective', 'Operations Perspective', 'People Perspective'],
            correctAnswer: 1,
            explanation: 'The Business Perspective helps stakeholders ensure that IT strategies support business outcomes and financial goals.',
            distractorExplanation: 'Governance is compliance. Operations is health/availability. People is skills/culture.'
        },
        {
            id: 'q8',
            scenario: 'Which architectural principle of the AWS Well-Architected Framework suggests "using temporary resources instead of keeping permanent infrastructure"?',
            options: ['Design for failure', 'Implement elasticity', 'Stop guessing capacity', 'Automate everything'],
            correctAnswer: 2,
            explanation: '"Stop guessing capacity" encourages using the cloud\'s elasticity to scale up and down as needed, rather than paying for idle permanent infrastructure.',
            distractorExplanation: 'Design for failure means things will break. Elasticity is the mechanism, "Stop guessing" is the principle regarding capacity.'
        },
        {
            id: 'q9',
            scenario: 'A company needs to store data that is rarely accessed but requires immediate retrieval if a request is made. Which S3 storage class is the most cost-effective?',
            options: ['S3 Standard', 'S3 Intelligent-Tiering', 'S3 Standard-IA (Infrequent Access)', 'S3 Glacier Flexible Retrieval'],
            correctAnswer: 2,
            explanation: 'S3 Standard-IA is designed for data accessed less frequently but requiring millisecond access (immediate retrieval).',
            distractorExplanation: 'Glacier requires minutes to hours. Standard is too expensive for rare access. Intelligent-Tiering has a monitoring fee.'
        },
        {
            id: 'q10',
            scenario: 'Which tool can be used to estimate the cost of a new solution architecture on AWS before any resources are deployed?',
            options: ['AWS Cost Explorer', 'AWS Budgets', 'AWS Pricing Calculator', 'AWS Trusted Advisor'],
            correctAnswer: 2,
            explanation: 'The AWS Pricing Calculator is a web-based planning tool to estimate costs for new services.',
            distractorExplanation: 'Cost Explorer and Budgets are for tracking actual/forecasted spend after deployment. Trusted Advisor is for optimization.'
        },
        {
            id: 'q11',
            scenario: 'Which AWS service is a managed NoSQL database service that provides single-digit millisecond performance at any scale?',
            options: ['Amazon RDS', 'Amazon Aurora', 'Amazon DynamoDB', 'Amazon Redshift'],
            correctAnswer: 2,
            explanation: 'DynamoDB is the flagship managed NoSQL database.',
            distractorExplanation: 'RDS and Aurora are relational. Redshift is a data warehouse.'
        },
        {
            id: 'q12',
            scenario: 'Which component of the AWS Global Infrastructure consists of one or more discrete data centers with redundant power, networking, and connectivity?',
            options: ['Region', 'Availability Zone', 'Edge Location', 'Local Zone'],
            correctAnswer: 1,
            explanation: 'An Availability Zone (AZ) is a cluster of data centers within a Region.',
            distractorExplanation: 'Regions contain AZs. Edge Locations are for CDN.'
        },
        {
            id: 'q13',
            scenario: 'A company wants to protect its web applications from common web exploits and bots. Which AWS service should they use?',
            options: ['AWS Shield', 'AWS WAF (Web Application Firewall)', 'Amazon Inspector', 'AWS GuardDuty'],
            correctAnswer: 1,
            explanation: 'AWS WAF filters web traffic (HTTP/S) based on rules to block SQL injection, XSS, and bots.',
            distractorExplanation: 'Shield is for DDoS. Inspector is for vulnerabilities. GuardDuty is for threat detection.'
        },
        {
            id: 'q14',
            scenario: 'Which AWS service acts as a "Virtual Firewalls" for Amazon EC2 instances to control inbound and outbound traffic at the instance level?',
            options: ['Network ACLs', 'Security Groups', 'AWS Shield', 'Route 53'],
            correctAnswer: 1,
            explanation: 'Security Groups operate at the instance level (stateful).',
            distractorExplanation: 'NACLs operate at the subnet level (stateless).'
        },
        {
            id: 'q15',
            scenario: 'A user wants to find out which IAM user deleted a specific S3 bucket last week. Which service provides this audit trail?',
            options: ['AWS CloudWatch', 'AWS CloudTrail', 'AWS Config', 'Amazon Macie'],
            correctAnswer: 1,
            explanation: 'AWS CloudTrail records API calls and account activity (Who, What, When).',
            distractorExplanation: 'CloudWatch is for metrics. Config is for resources. Macie is for data privacy.'
        },
        {
            id: 'q16',
            scenario: 'Which benefit of the cloud refers to the ability to "scale down" or "scale in" resources when demand decreases?',
            options: ['High Availability', 'Elasticity', 'Fault Tolerance', 'Reliability'],
            correctAnswer: 1,
            explanation: 'Elasticity is the ability to scale resources both up AND down automatically to match demand.',
            distractorExplanation: 'High availability ensures uptime. Fault tolerance is withstanding failures.'
        },
        {
            id: 'q17',
            scenario: 'Which AWS service provides highly durable and scalable object storage?',
            options: ['Amazon EBS', 'Amazon EFS', 'Amazon S3', 'Amazon Instance Store'],
            correctAnswer: 2,
            explanation: 'S3 is an object store (key-value) specifically designed for 99.999999999% durability.',
            distractorExplanation: 'EBS is block. EFS is file system. Instance Store is ephemeral block.'
        },
        {
            id: 'q18',
            scenario: 'What is the primary purpose of the AWS Trusted Advisor service?',
            options: ['Providing professional consulting services', 'Helping customers optimize their AWS environment for cost, security, and performance', 'Managing AWS account credentials', 'Creating automated backups of AWS resources'],
            correctAnswer: 1,
            explanation: 'Trusted Advisor provides automated checks and recommendations across five categories: Cost Optimization, Security, Fault Tolerance, Performance, and Service Limits.',
            distractorExplanation: 'Professional Services is the consulting arm. IAM manages credentials. AWS Backup manages backups.'
        },
        {
            id: 'q19',
            scenario: 'A global company wants to reduce latency for its users by caching content at locations closer to them. Which service should they use?',
            options: ['Amazon Route 53', 'AWS Global Accelerator', 'Amazon CloudFront', 'AWS Direct Connect'],
            correctAnswer: 2,
            explanation: 'Amazon CloudFront is a Content Delivery Network (CDN) that uses Edge Locations to cache content globally.',
            distractorExplanation: 'Global Accelerator optimizes the network path but doesn\'t cache content. Route 53 is DNS.'
        },
        {
            id: 'q20',
            scenario: 'Which support plan provides a 24/7 access to Cloud Support Engineers via phone and chat, and includes a "Technical Account Manager" (TAM)?',
            options: ['Developer Support', 'Business Support', 'Enterprise Support', 'Basic Support'],
            correctAnswer: 2,
            explanation: 'The Enterprise Support plan is the only one that includes a designated Technical Account Manager (TAM) and a Concierge Support Team.',
            distractorExplanation: 'Business support has 24/7 chat/phone but no TAM. Developer is business hours email.'
        }
    ]
};
