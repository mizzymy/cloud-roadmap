
import { ExamDefinition } from './types';

export const PHASE_1_EXAM_3: ExamDefinition = {
    id: 'clf-c02-exam-3',
    title: 'AWS Cloud Practitioner - Exam 3',
    code: 'CLF-C02',
    description: 'Technology, Services, and Architecture Patterns.',
    timeLimitMinutes: 30,
    passingScore: 700,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company needs to store unstructured data with high durability. The data will be accessed frequently. Which storage class is the default choice?',
            options: ['S3 Standard-IA', 'S3 Glacier', 'S3 Standard', 'EBS'],
            correctAnswer: 2,
            explanation: 'S3 Standard offers high durability (11 9s), availability, and performance for frequently accessed data.',
            distractorExplanation: 'IA is for infrequent access. Glacier is for archives. EBS is block storage, not object storage.'
        },
        {
            id: 'q2',
            scenario: 'You need to run a relational database. You need a solution that automates backups, patching, and failover. You do not want to manage the OS.',
            options: ['Install MySQL on EC2', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon Redshift'],
            correctAnswer: 1,
            explanation: 'Amazon RDS is a managed relational database service that handles heavy lifting like patching, backups, and recovery.',
            distractorExplanation: 'EC2 requires manual management (OS+DB). DynamoDB is NoSQL. Redshift is for analytics.'
        },
        {
            id: 'q3',
            scenario: 'Which service enables Infrastructure as Code (IaC)?',
            options: ['CloudFormation', 'CloudTrail', 'CloudWatch', 'Config'],
            correctAnswer: 0,
            explanation: 'CloudFormation allows you to model and provision all your cloud infrastructure resources using code templates.',
            distractorExplanation: 'Trail is logs. Watch is metrics. Config is compliance.'
        },
        {
            id: 'q4',
            scenario: 'A developer wants to run code without provisioning servers. The code should run only when triggered by an event (like a file upload).',
            options: ['EC2', 'Lambda', 'Fargate', 'Beanstalk'],
            correctAnswer: 1,
            explanation: 'AWS Lambda is the primary serverless compute service for event-driven functions.',
            distractorExplanation: 'Fargate is for containers. Beanstalk is for web apps.'
        },
        {
            id: 'q5',
            scenario: 'You need a file system that can be mounted by hundreds of EC2 instances concurrently.',
            options: ['EBS', 'EFS', 'S3', 'Instance Store'],
            correctAnswer: 1,
            explanation: 'Amazon EFS (Elastic File System) provides a scalable network file system (NFS) that can be shared across multiple instances.',
            distractorExplanation: 'EBS is generally limited to one instance (Multi-Attach exists but is niche/limited). S3 is object storage (not a file system). Instance Store is ephemeral.'
        },
        {
            id: 'q6',
            scenario: 'Which load balancer is best suited for HTTP/HTTPS traffic and advanced routing (Layer 7)?',
            options: ['Application Load Balancer (ALB)', 'Network Load Balancer (NLB)', 'Gateway Load Balancer', 'Classic Load Balancer'],
            correctAnswer: 0,
            explanation: 'ALB is designed for Layer 7 routing (URL path, host header).',
            distractorExplanation: 'NLB is Layer 4 (TCP/UDP) for performance. Gateway is for appliances.'
        },
        {
            id: 'q7',
            scenario: 'A company needs to execute SQL queries directly against data stored in S3 without loading it into a database.',
            options: ['Amazon Aurora', 'Amazon Redshift', 'Amazon Athena', 'Amazon Glue'],
            correctAnswer: 2,
            explanation: 'Amazon Athena is a serverless query service that makes it easy to analyze data in S3 using standard SQL.',
            distractorExplanation: 'Redshift requires loading data (usually). Aurora is a DB.'
        },
        {
            id: 'q8',
            scenario: 'Which service allows you to distribute traffic across multiple targets (EC2, Lambda) in multiple Availability Zones?',
            options: ['Auto Scaling', 'Elastic Load Balancing', 'Global Accelerator', 'Route 53'],
            correctAnswer: 1,
            explanation: 'ELB distributes incoming traffic across multiple targets to improve availability.',
            distractorExplanation: 'Auto Scaling adjusts capacity. Route 53 is DNS.'
        },
        {
            id: 'q9',
            scenario: 'What is the most cost-effective EC2 pricing option for a flexible workload that can handle interruptions?',
            options: ['Spot Instances', 'On-Demand', 'Reserved', 'Dedicated'],
            correctAnswer: 0,
            explanation: 'Spot instances offer the steepest discount (90%) but can be reclaimed.',
            distractorExplanation: 'Others are more expensive or require commitment.'
        },
        {
            id: 'q10',
            scenario: 'Which service is a global Content Delivery Network (CDN)?',
            options: ['Direct Connect', 'CloudFront', 'Global Accelerator', 'VPC endpoint'],
            correctAnswer: 1,
            explanation: 'CloudFront caches content at Edge Locations globally.',
            distractorExplanation: 'Accelerator is for routing. DX is for private connectivity.'
        },
        {
            id: 'q11',
            scenario: 'A company wants to decouple their monolithic application into microservices using a message bus (pub/sub).',
            options: ['SQS', 'SNS', 'Step Functions', 'Kinesis'],
            correctAnswer: 1,
            explanation: 'SNS (Simple Notification Service) uses a publish/subscribe model to fan out messages.',
            distractorExplanation: 'SQS is a queue (point to point). Step Functions is a workflow.'
        },
        {
            id: 'q12',
            scenario: 'Which service helps you observe and monitor resources and applications (Metrics, Logs, Alarms)?',
            options: ['CloudTrail', 'CloudWatch', 'Systems Manager', 'X-Ray'],
            correctAnswer: 1,
            explanation: 'CloudWatch is the monitoring and observability service.',
            distractorExplanation: 'X-Ray is for tracing.'
        },
        {
            id: 'q13',
            scenario: 'A company needs to host a simple static website (HTML/CSS/JS). What is the cheapest serverless option?',
            options: ['EC2', 'S3', 'Lambda', 'LightSail'],
            correctAnswer: 1,
            explanation: 'S3 Static Website Hosting is the most cost-effective way to host static sites.',
            distractorExplanation: 'EC2 requires a server. Lambda needs an API Gateway.'
        },
        {
            id: 'q14',
            scenario: 'Which database is a fully managed NoSQL key-value store?',
            options: ['RDS', 'DynamoDB', 'Neptune', 'DocumentDB'],
            correctAnswer: 1,
            explanation: 'DynamoDB is the AWS key-value NosQL offering.',
            distractorExplanation: 'Neptune is Graph. DocumentDB is Mongo-compatible.'
        },
        {
            id: 'q15',
            scenario: 'Which service provides a logical isolation of the AWS cloud (virtual network)?',
            options: ['Subnet', 'VPC', 'Security Group', 'NACL'],
            correctAnswer: 1,
            explanation: 'VPC (Virtual Private Cloud) is the isolated network environment.',
            distractorExplanation: 'Subnet is a subdivision of a VPC.'
        },
        {
            id: 'q16',
            scenario: 'You need to perform ETL (Extract, Transform, Load) jobs to prepare data for analytics.',
            options: ['AWS Glue', 'AWS Batch', 'AWS Data Pipeline', 'EMR'],
            correctAnswer: 0,
            explanation: 'AWS Glue is the serverless data integration service for ETL.',
            distractorExplanation: 'EMR is for big data clusters. Batch is for batch computing.'
        },
        {
            id: 'q17',
            scenario: 'Which service is used to govern your infrastructure by defining organization-wide rules (e.g., all volumes must be encrypted)?',
            options: ['AWS Config', 'Trusted Advisor', 'Inspector', 'GuardDuty'],
            correctAnswer: 0,
            explanation: 'AWS Config Rules allow you to audit and evaluate configurations for compliance.',
            distractorExplanation: 'Trusted Advisor gives recommendations.'
        },
        {
            id: 'q18',
            scenario: 'A user wants to be notified if their estimated billing exceeds $100.',
            options: ['Billing Dashboard', 'AWS Budgets', 'Cost Explorer', 'Support Ticket'],
            correctAnswer: 1,
            explanation: 'AWS Budgets is specifically for setting thresholds and alerts.',
            distractorExplanation: 'Explorer creates reports but not alerts.'
        },
        {
            id: 'q19',
            scenario: 'Which support plan provides a Technical Account Manager (TAM)?',
            options: ['Basic', 'Developer', 'Business', 'Enterprise'],
            correctAnswer: 3,
            explanation: 'Only the Enterprise (and On-Ramp) support plans include a TAM.',
            distractorExplanation: 'Business gives 24/7 phone support but no TAM.'
        },
        {
            id: 'q20',
            scenario: 'What is the purpose of an Edge Location?',
            options: ['Run EC2 instances', 'Host the production database', 'Cache content for CloudFront', 'Manage billing'],
            correctAnswer: 2,
            explanation: 'Edge locations are used by CloudFront to cache content closer to users.',
            distractorExplanation: 'They are not full regions.'
        }
    ]
};
