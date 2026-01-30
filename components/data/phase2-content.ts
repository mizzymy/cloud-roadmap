
import { StudyCard } from './studyContent';

export const PHASE_2_CONTENT: StudyCard[] = [
    // --- ADVANCED NETWORKING & VPC (25 Cards) ---
    {
        id: 'saa-vpc-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is a Transit Gateway?',
        answer: 'A network transit hub that connects VPCs and on-premises networks.',
        explanation: 'It simplifies network topology by removing complex peering relationships (hub-and-spoke).'
    },
    {
        id: 'saa-vpc-2',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which VPC feature allows two VPCs to communicate with each other as if they are on the same network?',
        options: ['VPC Peering', 'VPN Connection', 'Direct Connect', 'VPC Endpoints'],
        correctOptionIndex: 0,
        explanation: 'VPC Peering enables private traffic routing between two VPCs using private IPv4/IPv6 addresses.'
    },
    {
        id: 'saa-vpc-3',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is a VPC Endpoint?',
        answer: 'Enables private connections between your VPC and supported AWS services without using public internet.',
        explanation: 'Types: Interface Endpoints (PrivateLink) and Gateway Endpoints (S3, DynamoDB).'
    },
    {
        id: 'saa-vpc-4',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which services use Gateway Endpoints?',
        options: ['S3 and DynamoDB', 'EC2 and RDS', 'S3 and SNS', 'SQS and Kinesis'],
        correctOptionIndex: 0,
        explanation: 'Only Amazon S3 and DynamoDB use Gateway Endpoints; others use Interface Endpoints.'
    },
    {
        id: 'saa-vpc-5',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is an Egress-Only Internet Gateway?',
        answer: 'Allows IPv6 traffic from your VPC to the internet but prevents internet traffic from initiating IPv6 connections.',
        explanation: 'It is the IPv6 equivalent of a NAT Gateway.'
    },
    {
        id: 'saa-vpc-6',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Direct Connect?',
        answer: 'A dedicated physical network connection from your premises to AWS.',
        explanation: 'Bypasses the public internet for consistent latency and high throughput.'
    },
    {
        id: 'saa-vpc-7',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'To enable transitive routing between multiple VPCs and on-prem VPNs, which service should you use?',
        options: ['VPC Peering', 'Transit Gateway', 'VPC Endpoints', 'NAT Gateway'],
        correctOptionIndex: 1,
        explanation: 'Transit Gateway supports transitive routing; VPC Peering does NOT support transitive routing.'
    },
    {
        id: 'saa-vpc-8',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is a NAT Gateway?',
        answer: 'Allows instances in a private subnet to connect to the internet (e.g., for updates) but prevents the internet from connecting to them.',
        explanation: 'Managed service, scales automatically. Must be created in a public subnet.'
    },
    {
        id: 'saa-vpc-9',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is a Bastion Host?',
        answer: 'A server in a public subnet used to securely access instances in a private subnet.',
        explanation: 'Often accessed via SSH/RDP. Security groups should restrict access to known IPs.'
    },
    {
        id: 'saa-vpc-10',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which record type in Route 53 maps a hostname to an AWS resource like an ELB?',
        options: ['CNAME', 'Alias', 'A', 'AAAA'],
        correctOptionIndex: 1,
        explanation: 'Alias records are AWS-specific extensions to DNS that map to AWS resources for free and valid zone apex support.'
    },
    { id: 'saa-vpc-11', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Site-to-Site VPN?', answer: 'Encrypted tunnel (IPsec) connecting on-premises network to AWS VPC over the public internet.', explanation: 'Quick to set up, but performance depends on internet conditions.' },
    { id: 'saa-vpc-12', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Global Accelerator?', answer: 'Networking service that improves availability and performance of your applications with local or global users.', explanation: 'Uses AWS global network infrastructure instead of public internet.' },
    { id: 'saa-vpc-13', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which Route 53 routing policy creates an active-passive failover configuration?', options: ['Simple', 'Weighted', 'Failover', 'Latency'], correctOptionIndex: 2, explanation: 'Failover routing is used when you want a primary resource and a secondary DR resource.' },
    { id: 'saa-vpc-14', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is the purpose of VPC Flow Logs?', answer: 'Capture information about the IP traffic going to and from network interfaces in your VPC.', explanation: 'Critical for troubleshooting connectivity and security monitoring.' },
    { id: 'saa-vpc-15', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is a DHCP Options Set?', answer: 'Configuration for DHCP standards in a VPC, like domain name and DNS servers.', explanation: 'You can customize it to point to your own DNS servers.' },
    { id: 'saa-vpc-16', type: 'QUIZ', category: 'TECHNOLOGY', question: 'What happens to the data on an Instance Store volume when the EC2 instance is stopped?', options: ['It persists', 'It is lost', 'It is backed up to S3', 'It is moved to EBS'], correctOptionIndex: 1, explanation: 'Instance Store is ephemeral; data is lost on stop or termination.' },
    { id: 'saa-vpc-17', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'Difference between Security Group and NACL?', answer: 'SG: Stateful, Instance-level. NACL: Stateless, Subnet-level.', explanation: 'Stateful means return traffic is automatically allowed.' },
    { id: 'saa-vpc-18', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Bring Your Own IP (BYOIP)?', answer: 'Allows you to bring part or all of your publicly routable IPv4 or IPv6 address range to AWS.', explanation: 'Useful for whitelist reputation preservation.' },
    { id: 'saa-vpc-19', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is a Prefix List?', answer: 'A set of IP address ranges (CIDRs) that can be referenced in Security Groups and Route Tables.', explanation: 'Simplifies management of IP lists.' },
    { id: 'saa-vpc-20', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Can you peer VPCs across different AWS Regions?', options: ['Yes', 'No', 'Only via Transit Gateway', 'Only via VPN'], correctOptionIndex: 0, explanation: 'Yes, Inter-Region VPC Peering is supported.' },

    // --- HIGH AVAILABILITY & SCALING (25 Cards) ---
    {
        id: 'saa-ha-1',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is an Auto Scaling Group (ASG)?',
        answer: 'Logical grouping of EC2 instances for automatic scaling and management.',
        explanation: 'Ensures minimum/maximum number of instances and replaces unhealthy ones.'
    },
    {
        id: 'saa-ha-2',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'Which ASG scaling policy adjusts capacity based on a specific metric like "Average CPU = 50%"?',
        options: ['Simple Scaling', 'Step Scaling', 'Target Tracking', 'Scheduled Scaling'],
        correctOptionIndex: 2,
        explanation: 'Target Tracking acts like a thermostat, adding/removing instances to maintain the target metric value.'
    },
    {
        id: 'saa-ha-3',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is an Application Load Balancer (ALB)?',
        answer: 'Layer 7 load balancer. Routes traffic based on content (path, host, headers).',
        explanation: 'Supports HTTP/HTTPS, WebSockets, and containerized applications (Target Groups).'
    },
    {
        id: 'saa-ha-4',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is a Network Load Balancer (NLB)?',
        answer: 'Layer 4 load balancer. Handles TCP, UDP, TLS traffic with ultra-high performance.',
        explanation: 'Capable of handling millions of requests per second with low latency.'
    },
    {
        id: 'saa-ha-5',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'Which Load Balancer should you use for assigning a static IP address?',
        options: ['Application Load Balancer', 'Network Load Balancer', 'Classic Load Balancer', 'Gateway Load Balancer'],
        correctOptionIndex: 1,
        explanation: 'Only NLB supports static elastic IP addresses per Availability Zone.'
    },
    {
        id: 'saa-ha-6',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is Connection Draining (Deregistration Delay)?',
        answer: 'Time allowed for in-flight requests to complete before an instance is deregistered from ELB.',
        explanation: 'Prevents severing active connections during scaling actions.'
    },
    {
        id: 'saa-ha-7',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is a Launch Template?',
        answer: 'Similar to Launch Config but improved. Supports versioning and full EC2 feature set.',
        explanation: 'Recommended best practice for ASGs.'
    },
    {
        id: 'saa-ha-8',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'How do you ensure traffic is evenly distributed across EC2 instances in different AZs?',
        options: ['Target Tracking', 'Cross-Zone Load Balancing', 'Sticky Sessions', 'Health Checks'],
        correctOptionIndex: 1,
        explanation: 'Cross-Zone Load Balancing ensures traffic is distributed evenly across all registered targets in all enabled AZs.'
    },
    {
        id: 'saa-ha-9',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is Stickiness (Session Affinity)?',
        answer: 'Feature that binds a user\'s session to a specific instance.',
        explanation: 'Useful for stateful applications that don\'t store session data externally.'
    },
    {
        id: 'saa-ha-10',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is the purpose of a Placement Group?',
        answer: 'Controls how instances are placed on underlying hardware.',
        explanation: 'Strategies: Cluster (Performance), Partition (Hadoop/Kafka), Spread (Availability).'
    },
    { id: 'saa-ha-11', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'What is AWS Shield Advanced?', answer: 'Paid DDoS protection service with higher protection levels and 24/7 DRT support.', explanation: 'Includes cost protection against scaling spikes during attacks.' },
    { id: 'saa-ha-12', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'What is AWS WAF?', answer: 'Web Application Firewall to protect against common web exploits (SQLi, XSS).', explanation: 'Can be deployed on ALB, API Gateway, and CloudFront.' },
    { id: 'saa-ha-13', type: 'QUIZ', category: 'SEC_RESILIENCE', question: 'Which S3 feature helps recover from accidental object deletions?', options: ['Encryption', 'Versioning', 'Lifecycle Policies', 'S3 Select'], correctOptionIndex: 1, explanation: 'Versioning keeps multiple variants of an object, allowing retrieval of deleted versions.' },
    { id: 'saa-ha-14', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'Define RPO (Recovery Point Objective).', answer: 'The maximum acceptable amount of data loss measured in time.', explanation: 'Determines backup frequency.' },
    { id: 'saa-ha-15', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'Define RTO (Recovery Time Objective).', answer: 'The maximum acceptable time to restore operations after a failure.', explanation: 'Determines DR strategy (e.g., Pilot Light vs Active-Active).' },
    { id: 'saa-ha-16', type: 'QUIZ', category: 'SEC_RESILIENCE', question: 'Which DR strategy has the fastest RTO?', options: ['Backup & Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active/Active'], correctOptionIndex: 3, explanation: 'Multi-Site Active/Active routes traffic to multiple regions simultaneously, offering near-zero RTO.' },
    { id: 'saa-ha-17', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'What is a Gateway Load Balancer?', answer: 'Used to deploy, scale, and manage 3rd party virtual appliances (firewalls, IDS/IPS).', explanation: 'Operates at Layer 3 (Network).' },
    { id: 'saa-ha-18', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'What are ASG Lifecycle Hooks?', answer: 'Allow you to perform custom actions (e.g., scripts) when an instance launches or terminates.', explanation: 'Instance remains in wait state until hook completes.' },
    { id: 'saa-ha-19', type: 'FLASHCARD', category: 'SEC_RESILIENCE', question: 'What is EC2 Auto Recovery?', answer: 'Automatically recovers an instance if status checks fail due to hardware issues.', explanation: 'The recovered instance keeps ID, IP, and EBS.' },
    { id: 'saa-ha-20', type: 'QUIZ', category: 'SEC_RESILIENCE', question: 'Which EBS volume type is best for throughput-intensive big data workloads?', options: ['gp3', 'io2', 'st1', 'sc1'], correctOptionIndex: 2, explanation: 'st1 (Throughput Optimized HDD) is designed for big data, data warehouse, and log processing.' },

    // --- DATABASES & STORAGE (25 Cards) ---
    {
        id: 'saa-db-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon Aurora?',
        answer: 'AWS-native relational database compatible with MySQL and PostgreSQL.',
        explanation: 'Up to 5x faster than MySQL, 3x faster than PostgreSQL. Auto-scales storage.'
    },
    {
        id: 'saa-db-2',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which Aurora feature allows for sub-second latency read traffic across Regions?',
        options: ['Multi-AZ', 'Read Replicas', 'Global Database', 'Backtrack'],
        correctOptionIndex: 2,
        explanation: 'Aurora Global Database replicates data to other regions with typical latency of <1 second.'
    },
    {
        id: 'saa-db-3',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is DynamoDB?',
        answer: 'Key-value and document NoSQL database. Single-digit millisecond performance at any scale.',
        explanation: 'Serverless, fully managed.'
    },
    {
        id: 'saa-db-4',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is DAX?',
        answer: 'DynamoDB Accelerator. In-memory cache for DynamoDB.',
        explanation: 'Improve performance from milliseconds to microseconds.'
    },
    {
        id: 'saa-db-5',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which DynamoDB capacity mode is best for unpredictable workloads?',
        options: ['Provisioned', 'On-Demand', 'Reserved', 'Spot'],
        correctOptionIndex: 1,
        explanation: 'On-Demand automatically creates read/write capacity units to meet demand.'
    },
    {
        id: 'saa-db-6',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon Redshift?',
        answer: 'Petabyte-scale data warehouse. Columnar storage.',
        explanation: 'Best for OLAP (Online Analytical Processing) workloads.'
    },
    {
        id: 'saa-db-7',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon ElastiCache?',
        answer: 'Managed Redis and Memcached. In-memory data store for caching.',
        explanation: 'Used to offload databases and improve read performance.'
    },
    {
        id: 'saa-db-8',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'You need a graph database for a recommendation engine. Which service?',
        options: ['DynamoDB', 'RDS', 'Neptune', 'DocumentDB'],
        correctOptionIndex: 2,
        explanation: 'Amazon Neptune is a purpose-built graph database engine.'
    },
    {
        id: 'saa-db-9',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon DocumentDB?',
        answer: 'Fast, scalable, highly available, and fully managed Mongo-DB compatible database service.',
        explanation: 'Stores JSON data.'
    },
    {
        id: 'saa-db-10',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is S3 Transfer Acceleration?',
        answer: 'Speeds up content transfers to/from S3 using CloudFront Edge Locations.',
        explanation: 'Uses AWS global backbone network.'
    },
    { id: 'saa-db-11', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is S3 Intelligent-Tiering?', answer: 'Storage class that automatically moves data between tiers based on access patterns.', explanation: 'Optimizes costs without performance impact or overhead.' },
    { id: 'saa-db-12', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is S3 Object Lock?', answer: 'Prevents object deletion or overwriting (WORM - Write Once Read Many).', explanation: 'Used for regulatory compliance.' },
    { id: 'saa-db-13', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which EFS storage class is lower cost for infrequent access?', options: ['EFS Standard', 'EFS IA', 'EFS Archive', 'EFS Glacier'], correctOptionIndex: 1, explanation: 'EFS Infrequent Access (IA) costs significantly less.' },
    { id: 'saa-db-14', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'Difference between FSx for Windows and EFS?', answer: 'FSx: Native Windows (SMB). EFS: Linux (NFS).', explanation: 'Use FSx if you need Active Directory integration.' },
    { id: 'saa-db-15', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Storage Gateway - Volume Gateway?', answer: 'Presents cloud-backed iSCSI block storage volumes to your on-premises applications.', explanation: 'Cached (local speed) or Stored (full dataset local) modes.' },
    { id: 'saa-db-16', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Storage Gateway - File Gateway?', answer: 'NFS/SMB interface to S3.', explanation: 'Files stored as objects in S3.' },
    { id: 'saa-db-17', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which RDS feature improves Read performance?', options: ['Multi-AZ', 'Read Replicas', 'Automated Backups', 'Encryption'], correctOptionIndex: 1, explanation: 'Read Replicas allow you to offload read traffic from the primary instance.' },
    { id: 'saa-db-18', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is the purpose of RDS Multi-AZ?', answer: 'High Availability and Failover.', explanation: 'Synchronous replication to a standby instance in another AZ.' },
    { id: 'saa-db-19', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS DataSync?', answer: 'Service to move large amounts of data between on-premises and AWS.', explanation: 'Automated, accelerated data transfer.' },
    { id: 'saa-db-20', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which S3 feature allows you to replicate objects across accounts?', options: ['SRR', 'CRR', 'Both', 'Neither'], correctOptionIndex: 2, explanation: 'Both Same-Region (SRR) and Cross-Region (CRR) Replication support cross-account replication.' },

    // --- SERVERLESS & APP INTEGRATION (25 Cards) ---
    {
        id: 'saa-svl-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Step Functions?',
        answer: 'Serverless visual workflow orchestrator.',
        explanation: 'Orchestrates Lambda, ECS, and other services using state machines.'
    },
    {
        id: 'saa-svl-2',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which service is best for decoupled, asynchronous messaging between microservices?',
        options: ['SQS', 'SNS', 'Kinesis', 'Step Functions'],
        correctOptionIndex: 0,
        explanation: 'SQS (Simple Queue Service) pulls messages. SNS is "push". SQS is standard for decoupling.'
    },
    {
        id: 'saa-svl-3',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Kinesis Data Streams?',
        answer: 'Real-time scalable data streaming service.',
        explanation: 'Used for big data logs, metrics, IoT. Manually provisioned shards.'
    },
    {
        id: 'saa-svl-4',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'Difference between Kinesis Data Streams and Firehose?',
        answer: 'Streams: Real-time, manual scaling code needed. Firehose: Near real-time, managed, load into S3/Redshift.',
        explanation: 'Firehose is easiest for "load data into S3".'
    },
    {
        id: 'saa-svl-5',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'How long can a Lambda function run (timeout)?',
        options: ['5 minutes', '15 minutes', '1 hour', 'No limit'],
        correctOptionIndex: 1,
        explanation: 'The maximum execution time for an AWS Lambda function is 15 minutes.'
    },
    {
        id: 'saa-svl-6',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is API Gateway?',
        answer: 'Managed service to create, publish, maintain, monitor, and secure APIs.',
        explanation: 'Acts as a front door for applications (Rest or WebSocket).'
    },
    {
        id: 'saa-svl-7',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon EventBridge?',
        answer: 'Serverless event bus service (evolution of CloudWatch Events).',
        explanation: 'Connects apps using data from your apps, SaaS, and AWS services.'
    },
    {
        id: 'saa-svl-8',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which SQS queue type guarantees order (FIFO) and exactly-once processing?',
        options: ['Standard Queue', 'FIFO Queue', 'Dead Letter Queue', 'Priority Queue'],
        correctOptionIndex: 1,
        explanation: 'FIFO (First-In-First-Out) queues preserve order and prevent duplicates.'
    },
    {
        id: 'saa-svl-9',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is a Dead Letter Queue (DLQ)?',
        answer: 'A queue where messages are sent after failing to be processed a maximum number of times.',
        explanation: 'Useful for debugging application failures.'
    },
    {
        id: 'saa-svl-10',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS AppSync?',
        answer: 'Managed GraphQL service.',
        explanation: 'Simplifies application development by letting you create a flexible API to securely access data from multiple sources.'
    },
    { id: 'saa-svl-11', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon Cognito User Pools?', answer: 'Directory for users (Sign-up, Sign-in).', explanation: 'Handles registration, authentication, and account recovery.' },
    { id: 'saa-svl-12', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Amazon Cognito Identity Pools?', answer: 'Provides temporary AWS credentials to users so they can access AWS resources directly.', explanation: 'Exchange ID token for AWS credentials.' },
    { id: 'saa-svl-13', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which service can act as an NFS file system for Lambda?', options: ['S3', 'EBS', 'EFS', 'Instance Store'], correctOptionIndex: 2, explanation: 'Lambda can mount EFS to share data across invocations.' },
    { id: 'saa-svl-14', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Lambda Layers?', answer: 'A way to package libraries and other dependencies that you can pull into your Lambda function.', explanation: 'Reduces deployment package size.' },
    { id: 'saa-svl-15', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS X-Ray?', answer: 'Service to analyze and debug distributed applications (tracing).', explanation: 'Visualizes the service map.' },
    { id: 'saa-svl-16', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is ECS Fargate?', answer: 'Serverless compute engine for containers.', explanation: 'Removes the need to provision and manage servers (EC2) for your containers.' },
    { id: 'saa-svl-17', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Where should you store Docker images in AWS?', options: ['S3', 'EBS', 'ECR', 'ECS'], correctOptionIndex: 2, explanation: 'Elastic Container Registry (ECR) is a managed Docker container registry.' },
    { id: 'saa-svl-18', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is AWS Batch?', answer: 'Fully managed batch processing service.', explanation: 'Dynamically provisions optimal quantity and type of compute resources.' },
    { id: 'saa-svl-19', type: 'FLASHCARD', category: 'TECHNOLOGY', question: 'What is Fan-out pattern in SNS?', answer: 'Publishing a message to an SNS topic pushes it to multiple subscribing endpoints (SQS, Lambda, Email) in parallel.', explanation: 'Parallel processing.' },
    { id: 'saa-svl-20', type: 'QUIZ', category: 'TECHNOLOGY', question: 'Which API Gateway throttle setting limits the steady-state request rate?', options: ['Burst Limit', 'Rate Limit', 'Concurrency Limit', 'Quota Limit'], correctOptionIndex: 1, explanation: 'Rate Limit is the steady-state rate. Burst is the bucket size for spikes.' },
    // --- HIGH-FIDELITY EXAM RECALL (20 Additional Cards) ---
    {
        id: 'hf-2-1',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'How do you centrally inspect cross-VPC traffic using firewalls?',
        answer: 'Transit Gateway + Inspection VPC.',
        explanation: 'Route traffic through a central Hub VPC containing a fleet of security appliances.'
    },
    {
        id: 'hf-2-2',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the "Minimum Billable Size" for S3 Standard-IA?',
        answer: '128 KB.',
        explanation: 'Objects smaller than 128 KB are still billed as 128 KB, which can cause significant cost spikes for small files.'
    },
    {
        id: 'hf-2-3',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which S3 storage class provides millisecond access for rarely accessed data?',
        options: ['S3 Standard-IA', 'S3 Glacier Instant Retrieval', 'S3 Glacier Deep Archive', 'S3 Intelligent-Tiering'],
        correctOptionIndex: 1,
        explanation: 'Glacier Instant Retrieval is cheaper than Standard-IA for data accessed ~once a quarter but still needing rapid retrieval.'
    },
    {
        id: 'hf-2-4',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is the standard fix for ALB "502 Bad Gateway" during scale-up?',
        answer: 'Increase the Health Check Grace Period.',
        explanation: 'Prevents sending traffic to instances whose application software (e.g., Spring Boot, IIS) is not fully initialized.'
    },
    {
        id: 'hf-2-5',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is the "Pilot Light" DR strategy?',
        answer: 'Data is replicated; Compute (Servers) are provisioned but turned off/stopped.',
        explanation: 'Faster than Backup/Restore but cheaper than Warm Standby because compute is only started during DR.'
    },
    {
        id: 'hf-2-6',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which Aurora Serverless version can scale down to literal zero (pause)?',
        options: ['v1', 'v2', 'Both', 'Neither'],
        correctOptionIndex: 0,
        explanation: 'Aurora Serverless v1 supports "Pause after inactivity." v2 has a minimum 0.5 ACU footprint.'
    },
    {
        id: 'hf-2-7',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the architecture for an "Orders" system fan-out to 3 independent services?',
        answer: 'SNS Topic -> 3 SQS Queues.',
        explanation: 'Ensures that message consumption by one service does not prevent others from receiving the message.'
    },
    {
        id: 'hf-2-8',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'HPC workload needs hundreds of GB/s and sub-millisecond latency. Which FSx?',
        answer: 'FSx for Lustre.',
        explanation: 'Designed specifically for high-speed scratch space and large-scale data processing.'
    },
    {
        id: 'hf-2-9',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which ECS compute type provides kernel-level task isolation by default?',
        options: ['EC2', 'Fargate', 'EKS', 'Anywhere'],
        correctOptionIndex: 1,
        explanation: 'Fargate runs each task in its own dedicated, kernel-isolated runtime environment.'
    },
    {
        id: 'hf-2-10',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'How do you share a service between VPCs with OVERLAPPING CIDR blocks?',
        answer: 'AWS PrivateLink.',
        explanation: 'Uses Interface Endpoints to expose specific services, bypassing the need for unique IP routing.'
    },
    {
        id: 'hf-2-11',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'CloudFront Signed URLs vs Signed Cookies?',
        answer: 'URLs: Single file access. Cookies: Multiple files/wildcard access.',
        explanation: 'Cookies allow a user to access a whole HLS video stream (many segments) with one credential.'
    },
    {
        id: 'hf-2-12',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'Which S3 Object Lock mode prevents deletion by the ROOT user?',
        options: ['Governance', 'Compliance', 'Both', 'Neither'],
        correctOptionIndex: 1,
        explanation: 'Compliance mode is hardened against everyone, including the account root user, until the timer expires.'
    },
    {
        id: 'hf-2-13',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the most cost-effective EBS for 15,000 IOPS and 500GB size?',
        answer: 'gp3.',
        explanation: 'Allows independent provisioning of IOPS/Throughput. io2 would be significantly more expensive for this scale.'
    },
    {
        id: 'hf-2-14',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'How to block a specific Layer 7 DDoS attack (HTTP POST flood)?',
        answer: 'AWS WAF.',
        explanation: 'Shield handles L3/L4; WAF is required for request-level (L7) filtering and rate limiting.'
    },
    {
        id: 'hf-2-15',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which S3 File Gateway mode allows for 100% on-prem data availability for iSCSI?',
        options: ['S3 File Gateway', 'Volume Gateway - Stored', 'Volume Gateway - Cached', 'Tape Gateway'],
        correctOptionIndex: 1,
        explanation: 'Stored Volumes keep the primary data locally and only snapshot backups to AWS.'
    },
    {
        id: 'hf-2-16',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the purpose of AWS Direct Connect Gateway?',
        answer: 'Allows a single Direct Connect to access VPCs across multiple AWS regions.',
        explanation: 'Enables global hybrid connectivity through a central gateway.'
    },
    {
        id: 'hf-2-17',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'Difference between RPO and RTO?',
        answer: 'RPO: Data loss limit. RTO: Downtime limit.',
        explanation: 'RPO determines backup frequency; RTO determines server restoration speed.'
    },
    {
        id: 'hf-2-18',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which Route 53 policy is used for Active-Passive Disaster Recovery?',
        options: ['Weighted', 'Latency', 'Failover', 'Geolocation'],
        correctOptionIndex: 2,
        explanation: 'Failover routing directs traffic to a secondary health-checked endpoint if the primary fails.'
    },
    {
        id: 'hf-2-19',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What tools are used for a "Live" Oracle to Aurora migration?',
        answer: 'SCT + DMS (with CDC balance).',
        explanation: 'SCT converts schema; DMS moves the data and uses Change Data Capture to keep them synced for cutover.'
    },
    {
        id: 'hf-2-20',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'How to automatically remediate public S3 buckets at the Organization level?',
        answer: 'AWS Config Rules + SSM Automation.',
        explanation: 'Config detects the violation; SSM runs the "PutBucketPublicAccessBlock" command to fix it.'
    },
    {
        id: 'hf-2-21',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Transit Gateway Connect?',
        answer: 'Enables native integration of SD-WAN appliances with Transit Gateway using GRE and BGP.',
        explanation: 'Simplifies hybrid networking by allowing 3rd party appliances to peer directly with TGW.'
    },
    {
        id: 'hf-2-22',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'Which tool allows you to simulate and test the impact of a Disaster Recovery failover?',
        options: ['AWS Resilience Hub', 'AWS Fault Injection Service (FIS)', 'Route 53 ARC', 'AWS Backup'],
        correctOptionIndex: 1,
        explanation: 'FIS is a managed service for running fault injection experiments to improve resiliency.'
    },
    {
        id: 'hf-2-23',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon EFS Replication?',
        answer: 'Automatically replicates your file system data to another region or AZ for DR.',
        explanation: 'Provides a simple, managed way to meet RPO/RTO requirements for file data.'
    },
    {
        id: 'hf-2-24',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the purpose of AWS Global Accelerator Anycast IPs?',
        answer: 'Provides two static IP addresses that route traffic to the nearest healthy endpoint.',
        explanation: 'Simplifies whitelisting and improves performance by routing traffic over the AWS backbone.'
    },
    {
        id: 'hf-2-25',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which EBS volume type is designed for big data, data warehouses, and log processing?',
        options: ['gp3', 'io2', 'st1', 'sc1'],
        correctOptionIndex: 2,
        explanation: 'Throughput Optimized HDD (st1) is ideal for large, sequential workloads.'
    },
    {
        id: 'hf-2-26',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is a "Warm Standby" DR strategy?',
        answer: 'A scaled-down but functional version of your environment is always running.',
        explanation: 'Provides faster RTO than Pilot Light because servers are already running and ready to scale up.'
    },
    {
        id: 'hf-2-27',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS PrivateLink?',
        answer: 'Provides private connectivity between VPCs and services without using public IPs or traversing the internet.',
        explanation: 'Uses Interface Endpoints to keep traffic within the AWS network.'
    },
    {
        id: 'hf-2-28',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which service provides a central place to manage and govern multi-account AWS environments?',
        options: ['AWS Organizations', 'AWS Control Tower', 'AWS Config', 'AWS CloudFormation'],
        correctOptionIndex: 1,
        explanation: 'Control Tower simplifies the setup and governance of a landing zone based on best practices.'
    },
    {
        id: 'hf-2-29',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon Kinesis Data Firehose?',
        answer: 'A fully managed service for delivering real-time streaming data to destinations like S3, Redshift, and OpenSearch.',
        explanation: 'Handles all the heavy lifting of scaling and transforming data before delivery.'
    },
    {
        id: 'hf-2-30',
        type: 'FLASHCARD',
        category: 'SEC_RESILIENCE',
        question: 'What is the benefit of using Amazon Aurora Replicas?',
        answer: 'Provides both read scaling and high availability (auto-failover).',
        explanation: 'Replicas share the same underlying storage, leading to sub-10ms replication lag.'
    },
    {
        id: 'hf-2-31',
        type: 'QUIZ',
        category: 'TECHNOLOGY',
        question: 'Which tool helps you analyze and debug distributed applications, such as those built using a microservices architecture?',
        options: ['CloudWatch Logs', 'AWS X-Ray', 'CloudTrail', 'VPC Flow Logs'],
        correctOptionIndex: 1,
        explanation: 'X-Ray provides a horizontal view of requests as they travel across multiple services.'
    },
    {
        id: 'hf-2-32',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is the purpose of AWS App Runner?',
        answer: 'A fully managed service that makes it easy for developers to quickly deploy containerized web apps and APIs.',
        explanation: 'Handles infrastructure tasks like provisioning servers, scaling, and load balancing.'
    },
    {
        id: 'hf-2-33',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is Amazon Cognito User Pools?',
        answer: 'A user directory that provides sign-up and sign-in options for your app users.',
        explanation: 'Supports MFA, password policies, and social identity providers (Google, Facebook).'
    },
    {
        id: 'hf-2-34',
        type: 'QUIZ',
        category: 'SEC_RESILIENCE',
        question: 'Which AWS service provides high-availability DNS with record-level health checks?',
        options: ['Route 53', 'CloudFront', 'Global Accelerator', 'ELB'],
        correctOptionIndex: 0,
        explanation: 'Route 53 can route traffic based on the health of resources like ALBs or S3 buckets.'
    },
    {
        id: 'hf-2-35',
        type: 'FLASHCARD',
        category: 'TECHNOLOGY',
        question: 'What is AWS Lake Formation?',
        answer: 'A service that makes it easy to set up, secure, and manage a data lake.',
        explanation: 'Simplifies complex tasks like data ingestion, cleaning, and fine-grained access control.'
    }
];
