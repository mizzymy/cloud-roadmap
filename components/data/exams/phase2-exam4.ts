
import { ExamDefinition } from './types';

export const PHASE_2_EXAM_4: ExamDefinition = {
    id: 'saa-c03-exam-4',
    title: 'AWS Solutions Architect Associate - Exam 4',
    code: 'SAA-C03',
    description: 'General Practice Exam. Mixed Topics. Hard Difficulty.',
    timeLimitMinutes: 45,
    passingScore: 720,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company needs to host a DNS domain. They want to route traffic to the resource with the lowest network latency. They also want to use active-passive failover.',
            options: ['Route 53 with Latency & Failover policies', 'ELB with Health Checks', 'Global Accelerator', 'CloudFront'],
            correctAnswer: 0,
            explanation: 'Route 53 allows complex routing policies including combining Latency routing with Failover (Primary/Secondary) records.',
            distractorExplanation: 'ELB is regional. Accelerator routes, but R53 is the DNS authority.'
        },
        {
            id: 'q2',
            scenario: 'Which encrypted filesystem can simple Linux web servers use to share persistent configuration files across multiple AZs?',
            options: ['EBS', 'S3', 'EFS', 'Instance Store'],
            correctAnswer: 2,
            explanation: 'EFS is regional (Multi-AZ) and allows concurrent shared access.',
            distractorExplanation: 'EBS is specific to one AZ.'
        },
        {
            id: 'q3',
            scenario: 'You need to connect 100 VPCs to a central VPC for shared services. Peering is becoming unmanageable.',
            options: ['Transit Gateway', 'VPC Peering', 'VPN CloudHub', 'PrivateLink'],
            correctAnswer: 0,
            explanation: 'Transit Gateway is the hub-and-spoke solution for connecting many VPCs.',
            distractorExplanation: 'Peering doesn\'t support transitive routing (mesh mess).'
        },
        {
            id: 'q4',
            scenario: 'A company wants to store data in S3 but keys must be managed by the customer. The customer does NOT want to manage the encryption software code.',
            options: ['SSE-C', 'Client-Side Encryption', 'SSE-KMS', 'SSE-S3'],
            correctAnswer: 0,
            explanation: 'SSE-C (Customer-Provided Keys) allows you to send the key, and S3 handles the encryption/decryption logic. You manage the key storage.',
            distractorExplanation: 'Client-Side requires you to code the encryption. KMS is AWS managed keys (mostly).'
        },
        {
            id: 'q5',
            scenario: 'Which service allows you to capture client IP addresses reaching your Application Load Balancer?',
            options: ['X-Forwarded-For Header', 'VPC Flow Logs', 'CloudTrail', 'Access Logs'],
            correctAnswer: 0,
            explanation: 'Because the ALB terminates the connection, the source IP in the packet is the ALB\'s. The original client IP is preserved in the X-Forwarded-For HTTP header.',
            distractorExplanation: 'Flow logs show ALB IP. Access logs show it too but X-Forwarded-For is the real-time header app uses.'
        },
        {
            id: 'q6',
            scenario: 'You need to migrate a 10TB Data Warehouse to AWS. You want to use a schema that supports columnar storage.',
            options: ['Redshift', 'Aurora', 'DynamoDB', 'RDS'],
            correctAnswer: 0,
            explanation: 'Redshift is the AWS Data Warehouse (columnar).',
            distractorExplanation: 'Aurora is row (OLTP).'
        },
        {
            id: 'q7',
            scenario: 'A company has a requirement to detect PII in S3 buckets.',
            options: ['Macie', 'GuardDuty', 'Inspector', 'Comprehend'],
            correctAnswer: 0,
            explanation: 'Macie discovers PII.',
            distractorExplanation: 'GuardDuty finds threats.'
        },
        {
            id: 'q8',
            scenario: 'You want to automate the creation of a Landing Zone with multi-account best practices.',
            options: ['Control Tower', 'Organizations', 'Config', 'Service Catalog'],
            correctAnswer: 0,
            explanation: 'AWS Control Tower automates the setup of a landing zone (logging, security, organizations).',
            distractorExplanation: 'Organizations is the raw capability, Control Tower is the orchestrator.'
        },
        {
            id: 'q9',
            scenario: 'You need to provide temporary access to an S3 object to a user who doesn\'t have AWS credentials.',
            options: ['Presigned URL', 'IAM User', 'Bucket Policy', 'ACL'],
            correctAnswer: 0,
            explanation: 'Presigned URL allows anyone with the link to access the object for a limited time.',
            distractorExplanation: 'IAM requires creds.'
        },
        {
            id: 'q10',
            scenario: 'Which instance type is best for Memory-intensive workloads (large in-memory caches)?',
            options: ['R family', 'C family', 'M family', 'G family'],
            correctAnswer: 0,
            explanation: 'R instances are RAM optimized.',
            distractorExplanation: 'C is Compute. M is General. G is Graphics.'
        },
        {
            id: 'q11',
            scenario: 'A company wants to accelerate the transfer of files into S3 from users all over the world.',
            options: ['S3 Transfer Acceleration', 'Global Accelerator', 'CloudFront', 'Direct Connect'],
            correctAnswer: 0,
            explanation: 'Transfer Acceleration uses CloudFront edge locations to route uploads to S3 faster.',
            distractorExplanation: 'Global Accelerator is for TCP/UDP routing, not specifically S3 uploads via API.'
        },
        {
            id: 'q12',
            scenario: 'You have a legacy single-threaded application that requires high per-core performance.',
            options: ['High frequency Compute Optimized (C5)', 'General Purpose', 'Burstable (T3)', 'Memory Optimized'],
            correctAnswer: 0,
            explanation: 'Compute Optimized (C) instances offer high clock speeds.',
            distractorExplanation: 'Burstable can throttle.'
        },
        {
            id: 'q13',
            scenario: 'Which service allows you to manage SSL certificates?',
            options: ['ACM', 'IAM', 'KMS', 'Secrets Manager'],
            correctAnswer: 0,
            explanation: 'AWS Certificate Manager.',
            distractorExplanation: 'KMS is keys.'
        },
        {
            id: 'q14',
            scenario: 'You need to audit the history of API calls made in your account.',
            options: ['CloudTrail', 'CloudWatch', 'Config', 'Artifact'],
            correctAnswer: 0,
            explanation: 'CloudTrail logs API activity.',
            distractorExplanation: 'Watch is monitoring.'
        },
        {
            id: 'q15',
            scenario: 'A company needs to store backups that must be retained for 10 years for compliance. Retrieval time is not critical.',
            options: ['S3 Glacier Deep Archive', 'S3 Glacier Flexible', 'S3 Standard-IA', 'S3 Intelligent-Tiering'],
            correctAnswer: 0,
            explanation: 'Deep Archive is the cheapest storage for long-term retention where retrieval time (12-48h) is acceptable.',
            distractorExplanation: 'Flexible is more expensive.'
        },
        {
            id: 'q16',
            scenario: 'Which VPC feature allows an instance to communicate with the internet but prevents inbound traffic?',
            options: ['NAT Gateway', 'Internet Gateway', 'VPC Peering', 'VPN'],
            correctAnswer: 0,
            explanation: 'NAT Gateway.',
            distractorExplanation: 'IGW is bidirectional.'
        },
        {
            id: 'q17',
            scenario: 'You want to run capacity checks to see if your account is close to hitting service limits.',
            options: ['Trusted Advisor', 'Inspector', 'Config', 'Health'],
            correctAnswer: 0,
            explanation: 'Trusted Advisor checks Service Limits.',
            distractorExplanation: 'Others do not.'
        },
        {
            id: 'q18',
            scenario: 'Which service queues messages?',
            options: ['SQS', 'SNS', 'SES', 'SWF'],
            correctAnswer: 0,
            explanation: 'SQS.',
            distractorExplanation: 'SNS is topics.'
        },
        {
            id: 'q19',
            scenario: 'You want to encrypt an existing unencrypted EBS volume.',
            options: ['Snapshot, Copy with Encryption, Create Volume', 'Enable Encryption on the volume', 'Use OS encryption', 'Reboot instance'],
            correctAnswer: 0,
            explanation: 'You cannot encrypt an existing volume in place. You must snapshot it, copy the snapshot (enabling encryption), and creating a new volume from that.',
            distractorExplanation: 'In-place encryption is not supported.'
        },
        {
            id: 'q20',
            scenario: 'Which service is appropriate for decoupled event-driven architectures involving filtering and routing events between SaaS apps and AWS?',
            options: ['EventBridge', 'SNS', 'SQS', 'Kinesis'],
            correctAnswer: 0,
            explanation: 'EventBridge (formerly CloudWatch Events) is a serverless event bus that makes it easy to connect applications together using data from your own apps, SaaS, and AWS services.',
            distractorExplanation: 'SNS works but EventBridge has more advanced rules/schema/SaaS integration.'
        }
    ]
};
