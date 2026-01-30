
import { ExamDefinition } from './types';

export const PHASE_3_EXAM_4: ExamDefinition = {
    id: 'sap-c02-exam-4',
    title: 'AWS Solutions Architect Professional - Exam 4',
    code: 'SAP-C02',
    description: 'General Practice Exam. Mixed Topics. PRO Difficulty.',
    timeLimitMinutes: 60,
    passingScore: 750,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company operates a "walled garden" environment where VPCs are strictly isolated. However, they need to update the software on thousands of EC2 instances without internet access (No NAT Gateways allowed).',
            options: ['Use VPC Endpoints for Systems Manager (SSM) and S3, and use SSM Run Command/Patch Manager.', 'Use a Proxy Server in a DMZ VPC.', 'Sneaker-net updates.', 'Temporarily attach IGW.'],
            correctAnswer: 0,
            explanation: 'VPC Endpoints (Interface Endpoints) allowing private connectivity to AWS APIs (SSM, S3, EC2messages) is the standard secure pattern for air-gapped management.',
            distractorExplanation: 'Proxy requires peering/transit, breaking isolation if not careful. Endpoints are local.'
        },
        {
            id: 'q2',
            scenario: 'You need to migrate a 10TB Data Warehouse to AWS. You want to use a schema that supports columnar storage.',
            options: ['Redshift', 'Aurora', 'DynamoDB', 'RDS'],
            correctAnswer: 0,
            explanation: 'Redshift is the AWS Data Warehouse (columnar).',
            distractorExplanation: 'Aurora is row (OLTP).'
        },
        {
            id: 'q3',
            scenario: 'A company has a requirement to detect PII in S3 buckets.',
            options: ['Macie', 'GuardDuty', 'Inspector', 'Comprehend'],
            correctAnswer: 0,
            explanation: 'Macie discovers PII.',
            distractorExplanation: 'GuardDuty finds threats.'
        },
        {
            id: 'q4',
            scenario: 'You want to automate the creation of a Landing Zone with multi-account best practices.',
            options: ['Control Tower', 'Organizations', 'Config', 'Service Catalog'],
            correctAnswer: 0,
            explanation: 'AWS Control Tower automates the setup of a landing zone (logging, security, organizations).',
            distractorExplanation: 'Organizations is the raw capability, Control Tower is the orchestrator.'
        },
        {
            id: 'q5',
            scenario: 'You need to provide temporary access to an S3 object to a user who doesn\'t have AWS credentials.',
            options: ['Presigned URL', 'IAM User', 'Bucket Policy', 'ACL'],
            correctAnswer: 0,
            explanation: 'Presigned URL allows anyone with the link to access the object for a limited time.',
            distractorExplanation: 'IAM requires creds.'
        },
        {
            id: 'q6',
            scenario: 'Which instance type is best for Memory-intensive workloads (large in-memory caches)?',
            options: ['R family', 'C family', 'M family', 'G family'],
            correctAnswer: 0,
            explanation: 'R instances are RAM optimized.',
            distractorExplanation: 'C is Compute. M is General. G is Graphics.'
        },
        {
            id: 'q7',
            scenario: 'A company wants to accelerate the transfer of files into S3 from users all over the world.',
            options: ['S3 Transfer Acceleration', 'Global Accelerator', 'CloudFront', 'Direct Connect'],
            correctAnswer: 0,
            explanation: 'Transfer Acceleration uses CloudFront edge locations to route uploads to S3 faster.',
            distractorExplanation: 'Global Accelerator is for TCP/UDP routing, not specifically S3 uploads via API.'
        },
        {
            id: 'q8',
            scenario: 'You have a legacy single-threaded application that requires high per-core performance.',
            options: ['High frequency Compute Optimized (C5)', 'General Purpose', 'Burstable (T3)', 'Memory Optimized'],
            correctAnswer: 0,
            explanation: 'Compute Optimized (C) instances offer high clock speeds.',
            distractorExplanation: 'Burstable can throttle.'
        },
        {
            id: 'q9',
            scenario: 'Which service allows you to manage SSL certificates?',
            options: ['ACM', 'IAM', 'KMS', 'Secrets Manager'],
            correctAnswer: 0,
            explanation: 'AWS Certificate Manager.',
            distractorExplanation: 'KMS is keys.'
        },
        {
            id: 'q10',
            scenario: 'You need to audit the history of API calls made in your account.',
            options: ['CloudTrail', 'CloudWatch', 'Config', 'Artifact'],
            correctAnswer: 0,
            explanation: 'CloudTrail logs API activity.',
            distractorExplanation: 'Watch is monitoring.'
        },
        {
            id: 'q11',
            scenario: 'A company needs to store backups that must be retained for 10 years for compliance. Retrieval time is not critical.',
            options: ['S3 Glacier Deep Archive', 'S3 Glacier Flexible', 'S3 Standard-IA', 'S3 Intelligent-Tiering'],
            correctAnswer: 0,
            explanation: 'Deep Archive is the cheapest storage for long-term retention where retrieval time (12-48h) is acceptable.',
            distractorExplanation: 'Flexible is more expensive.'
        },
        {
            id: 'q12',
            scenario: 'Which VPC feature allows an instance to communicate with the internet but prevents inbound traffic?',
            options: ['NAT Gateway', 'Internet Gateway', 'VPC Peering', 'VPN'],
            correctAnswer: 0,
            explanation: 'NAT Gateway.',
            distractorExplanation: 'IGW is bidirectional.'
        },
        {
            id: 'q13',
            scenario: 'You want to run capacity checks to see if your account is close to hitting service limits.',
            options: ['Trusted Advisor', 'Inspector', 'Config', 'Health'],
            correctAnswer: 0,
            explanation: 'Trusted Advisor checks Service Limits.',
            distractorExplanation: 'Others do not.'
        },
        {
            id: 'q14',
            scenario: 'Which service queues messages?',
            options: ['SQS', 'SNS', 'SES', 'SWF'],
            correctAnswer: 0,
            explanation: 'SQS.',
            distractorExplanation: 'SNS is topics.'
        },
        {
            id: 'q15',
            scenario: 'You want to encrypt an existing unencrypted EBS volume.',
            options: ['Snapshot, Copy with Encryption, Create Volume', 'Enable Encryption on the volume', 'Use OS encryption', 'Reboot instance'],
            correctAnswer: 0,
            explanation: 'You cannot encrypt an existing volume in place. You must snapshot it, copy the snapshot (enabling encryption), and creating a new volume from that.',
            distractorExplanation: 'In-place encryption is not supported.'
        },
        {
            id: 'q16',
            scenario: 'Which service is appropriate for decoupled event-driven architectures involving filtering and routing events between SaaS apps and AWS?',
            options: ['EventBridge', 'SNS', 'SQS', 'Kinesis'],
            correctAnswer: 0,
            explanation: 'EventBridge (formerly CloudWatch Events) is a serverless event bus that makes it easy to connect applications together using data from your own apps, SaaS, and AWS services.',
            distractorExplanation: 'SNS works but EventBridge has more advanced rules/schema/SaaS integration.'
        },
        {
            id: 'q17',
            scenario: 'You need to improve the performance of a DynamoDB table scan.',
            options: ['Parallel Scan.', 'Read Replicas.', 'Index.', 'DAX.'],
            correctAnswer: 0,
            explanation: 'Parallel Scan allows multiple workers to scan segments of the table concurrently.',
            distractorExplanation: 'DAX is for point reads.'
        },
        {
            id: 'q18',
            scenario: 'You have a Redshift cluster. You need to ensure it is encrypted.',
            options: ['Enable encryption at launch (or modify/reboot).', 'Use Client-Side.', 'Use VPN.', 'Use OS tools.'],
            correctAnswer: 0,
            explanation: 'Redshift supports encryption at rest via KMS or HSM defined at cluster launch or modification.',
            distractorExplanation: '.'
        },
        {
            id: 'q19',
            scenario: 'A company wants to migrate an Oracle DB to Aurora PostgreSQL.',
            options: ['SCT + DMS.', 'Export/Import.', 'Native Replication.', 'DataSync.'],
            correctAnswer: 0,
            explanation: 'Schema Conversion Tool + Database Migration Service.',
            distractorExplanation: '.'
        },
        {
            id: 'q20',
            scenario: 'You need to expose a private API to a partner in another VPC.',
            options: ['PrivateLink.', 'Peering.', 'VPN.', 'Public Internet.'],
            correctAnswer: 0,
            explanation: 'PrivateLink (VPC Endpoint Services) allows safe, unidirectional exposure of services.',
            distractorExplanation: '.'
        }
    ]
};
