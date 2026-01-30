
import { StudyCard } from './studyContent';

export const PHASE_3_CONTENT: StudyCard[] = [
    // --- ORGANIZATIONAL COMPLEXITY & MULTI-ACCOUNT (20 Cards) ---
    {
        id: 'sap-org-1',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is SCP inheritance in AWS Organizations?',
        answer: 'SCPs are filter policies. Permissions are filtered at each level (Root -> OU -> Account). An explicit DENY at any level overrides an ALLOW.',
        explanation: 'If a permission is not explicitly allowed at higher levels (by FullAWSAccess), it is implicitly denied.'
    },
    {
        id: 'sap-org-2',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'You need to share a subnet across multiple AWS accounts in an Organization. which service?',
        options: ['VPC Peering', 'Transit Gateway', 'Resource Access Manager (RAM)', 'PrivateLink'],
        correctOptionIndex: 2,
        explanation: 'RAM allowed you to share subnets (VPC sharing) with other accounts in your Organization.'
    },
    {
        id: 'sap-org-3',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is AWS Control Tower?',
        answer: 'A managed service that provides the easiest way to set up and govern a secure, multi-account AWS environment (Landing Zone).',
        explanation: 'It uses AWS Organizations, SSO, and Config under the hood.'
    },
    {
        id: 'sap-org-4',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'How do you centrally manage backup policies across all accounts in an Organization?',
        options: ['AWS Backup + AWS Organizations', 'S3 Lifecycle Policies', 'DataSync', 'Storage Gateway'],
        correctOptionIndex: 0,
        explanation: 'AWS Backup integrates with Organizations to apply backup policies (backup plans) across all member accounts.'
    },
    { id: 'sap-org-5', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is the "hub-and-spoke" network topology?', answer: 'A central network (Hub/Transit Gateway) connects multiple spokes (VPCs/VPNs). Traffic flows through the hub.', explanation: 'simplifies management compared to full mesh peering.' },
    { id: 'sap-org-6', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS Service Catalog?', answer: 'Allows organizations to create and manage catalogs of IT services that are approved for use on AWS.', explanation: 'Enables self-service with governance.' },
    { id: 'sap-org-7', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Which feature restricts the services that can be used within a specific OU?', options: ['IAM Policies', 'Service Control Policies (SCP)', 'ACLs', 'Security Groups'], correctOptionIndex: 1, explanation: 'SCPs are used to set the maximum available permissions for accounts in an organization.' },
    { id: 'sap-org-8', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS SSO (IAM Identity Center)?', answer: 'Centralized management of SSO access to AWS accounts and business applications.', explanation: 'Successor to AWS SSO.' },
    { id: 'sap-org-9', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'Cost Allocation Tags limits?', answer: 'You must activate keys in the payer account. They appear in Cost Explorer after activation.', explanation: 'Essential for chargeback models.' },
    { id: 'sap-org-10', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Which strategy is best for isolating production workloads from dev/test?', options: ['Separate VPCs in one account', 'Separate Subnets', 'Separate AWS Accounts', 'Resource Tagging'], correctOptionIndex: 2, explanation: 'Using separate AWS Accounts provides the strongest isolation boundary (security, billing, limits).' },

    // --- ADVANCED HYBRID & NETWORKING (30 Cards) ---
    {
        id: 'sap-net-1',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is a Direct Connect Gateway?',
        answer: 'A global resource that connects a Direct Connect VIF to one or more VPCs (via VGW) or Transit Gateways across any region.',
        explanation: 'Enables global connectivity from a single DX connection.'
    },
    {
        id: 'sap-net-2',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'To connect 50 VPCs and on-prem via VPN with transitive routing, what is the best architecture?',
        options: ['Mesh VPC Peering', 'Transit Gateway', 'VPN CloudHub', 'Direct Connect'],
        correctOptionIndex: 1,
        explanation: 'Transit Gateway creates a scalable hub-and-spoke model, supporting transitive routing between VPCs and VPN.'
    },
    {
        id: 'sap-net-3',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'Difference between Public VIF and Private VIF?',
        answer: 'Private VIF: Connects to private resources (VPC). Public VIF: Connects to public AWS endpoints (S3, DynamoDB) over DX.',
        explanation: 'Public VIF replaces traffic over the public internet.'
    },
    {
        id: 'sap-net-4',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is BGP (Border Gateway Protocol)?',
        answer: 'The protocol used to exchange routing information between your on-prem network and AWS (Dynamic Routing).',
        explanation: 'Required for Direct Connect and Site-to-Site VPN dynamic routing.'
    },
    {
        id: 'sap-net-5',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which Route 53 feature allows you to route users to the "closest" region?',
        options: ['Geolocation', 'Geoproximity', 'Latency-based', 'Weighted'],
        correctOptionIndex: 2,
        explanation: 'Latency-based routing directs traffic to the region with the lowest latency for the user.'
    },
    { id: 'sap-net-6', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is DNSSEC?', answer: 'Adds cryptographic signatures to existing DNS records to prevent spoofing/poisoning.', explanation: 'Route 53 supports signing zones and validation.' },
    { id: 'sap-net-7', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Route 53 Resolver?', answer: 'Provides recursive DNS lookup. Endpoints allow hybrid DNS resolution between on-prem and VPC.', explanation: 'Inbound Endpoint (On-prem -> Cloud), Outbound Endpoint (Cloud -> On-prem).' },
    { id: 'sap-net-8', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'How do you inspect traffic entering a VPC before it reaches endpoints?', options: ['VPC Flow Logs', 'Traffic Mirroring', 'Gateway Load Balancer', 'WAF'], correctOptionIndex: 2, explanation: 'Gateway Load Balancer allows you to deploy inline 3rd party firewalls/appliances transparently.' },
    { id: 'sap-net-9', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Lambda@Edge?', answer: 'Runs Lambda functions at CloudFront Edge Locations.', explanation: 'Used for request/response manipulation, authentication, or custom routing at the edge.' },
    { id: 'sap-net-10', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Global Accelerator?', answer: 'Uses AWS global network to route traffic to optimal endpoints. Provides 2 static Anycast IPs.', explanation: 'Bypasses internet congestion. Fast failover across regions.' },
    { id: 'sap-net-11', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Requires dedicated physical server for licensing (BYOL).', options: ['Dedicated Instances', 'Dedicated Hosts', 'Reserved Instances', 'Bare Metal'], correctOptionIndex: 1, explanation: 'Dedicated Hosts give you visibility into sockets/cores, required for some BYOL scenarios.' },
    { id: 'sap-net-12', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Systems Manager Session Manager?', answer: 'Secure, auditable instance management without opening inbound ports (SSH/RDP).', explanation: 'Uses the SSM Agent.' },
    { id: 'sap-net-13', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What are VPC Endpoints (Interface)?', answer: 'PrivateLink powered. ENIs in your subnet. Private connectivity to AWS services.', explanation: 'Does NOT require Route Table or IGW changes.' },
    { id: 'sap-net-14', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Accelerate upload of 50TB data to S3 over choppy internet.', options: ['S3 Transfer Acceleration', 'Multipart Upload', 'AWS Snowball', 'Direct Connect'], correctOptionIndex: 2, explanation: 'For 50TB with poor internet, physical data transfer via Snowball is faster and reliable.' },
    { id: 'sap-net-15', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is a Transit VIF?', answer: 'Used with Direct Connect Gateway to connect to a Transit Gateway.', explanation: 'Enables connectivity to thousands of VPCs.' },

    // --- MIGRATION & MODERNIZATION (25 Cards) ---
    {
        id: 'sap-mig-1',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the "6 R\'s" of migration?',
        answer: 'Rehost (Lift & Shift), Replatform (Lift, Tinker, Shift), Repurchase (Drop & Shop), Refactor (Re-architect), Retire, Retain.',
        explanation: 'Strategies for moving apps to the cloud.'
    },
    {
        id: 'sap-mig-2',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which tool discovers dependencies between on-premises servers for migration planning?',
        options: ['Migration Hub', 'Application Discovery Service', 'Server Migration Service', 'DMS'],
        correctOptionIndex: 1,
        explanation: 'ADS agentless or agent-based collectors identify server dependencies and utilization.'
    },
    {
        id: 'sap-mig-3',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is AWS DMS + SCT?',
        answer: 'DMS (Database Migration Service) moves data. SCT (Schema Conversion Tool) converts schema (e.g., Oracle to Aurora).',
        explanation: 'SCT is used for heterogeneous migrations.'
    },
    {
        id: 'sap-mig-4',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is DataSync?',
        answer: 'Automated data transfer service. NFS/SMB/Object -> S3/EFS/FSx.',
        explanation: 'Up to 10x faster than open source tools. Validates data integrity.'
    },
    {
        id: 'sap-mig-5',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Migrating an NFS file server to AWS relying on Active Directory permissions.',
        options: ['EFS', 'S3', 'FSx for Windows File Server', 'EBS'],
        correctOptionIndex: 2,
        explanation: 'FSx for Windows provides fully managed, native Windows file system with AD integration.'
    },
    { id: 'sap-mig-6', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is a Snowball Edge?', answer: 'Petabyte-scale data transport device with on-board compute (EC2/Lambda).', explanation: 'Can process data locally before shipping back to AWS.' },
    { id: 'sap-mig-7', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Application Migration Service (MGN)?', answer: 'The primary service for Lift-and-Shift server migrations (block-level replication).', explanation: 'Replaces SMS.' },
    { id: 'sap-mig-8', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Strangler Fig Pattern?', options: ['Database locking', 'Migration strategy', 'Security attack', 'Cost optimization'], correctOptionIndex: 1, explanation: 'Gradually replacing specific pieces of functionality with new cloud-native services (Microservices) until the monolith is gone.' },
    { id: 'sap-mig-9', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is VMware Cloud on AWS?', answer: 'Managed vSphere environment running on AWS bare metal infrastructure.', explanation: 'Seamless migration of VM workloads without reformatting.' },
    { id: 'sap-mig-10', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS Migration Hub?', answer: 'Central tracking for migrations across multiple AWS and partner solutions.', explanation: 'Single pane of glass for migration progress.' },

    // --- CONTINUOUS IMPROVEMENT & COMPLEX ARCH (25 Cards) ---
    {
        id: 'sap-cim-1',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Event Sourcing?',
        answer: 'Pattern where state changes are stored as a sequence of events.',
        explanation: 'Allows full audit trail and point-in-time recovery. Often used with Kinesis/DynamoDB.'
    },
    {
        id: 'sap-cim-2',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'How to handle flash traffic (100x spike) for a static marketing site?',
        options: ['Auto Scaling Group', 'CloudFront + S3', 'Large EC2 instances', 'Lambda'],
        correctOptionIndex: 1,
        explanation: 'S3 static hosting behind CloudFront is the most resilient and cost-effective for static content spikes.'
    },
    {
        id: 'sap-cim-3',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is CQRS (Command Query Responsibility Segregation)?',
        answer: 'Separating read and write operations for a data store.',
        explanation: 'Optimize read and write performance independently (e.g., RDS for writes, ElasticSearch for reads).'
    },
    {
        id: 'sap-cim-4',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Sharding?',
        answer: 'Horizontal partitioning of data across multiple databases/shards.',
        explanation: 'Overcomes write limits of a single DB instance.'
    },
    {
        id: 'sap-cim-5',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Disaster Recovery: RTO/RPO near zero, multi-region.',
        options: ['Backup & Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active/Active'],
        correctOptionIndex: 3,
        explanation: 'Active/Active usually with DynamoDB Global Tables or Aurora Global DB provides the lowest RTO/RPO.'
    },
    { id: 'sap-cim-6', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Kinesis Firehose transformation?', answer: 'Can invoke a Lambda function to transform data (e.g., JSON -> CSV) before delivery.', explanation: 'Serverless ETL.' },
    { id: 'sap-cim-7', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS X-Ray Sampling?', answer: 'Configuration to control how many requests are recorded.', explanation: 'Reduces cost and overhead while still providing statistical significance.' },
    { id: 'sap-cim-8', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Protecting S3 data against accidental deletion AND deletion by root user?', options: ['Versioning', 'MFA Delete', 'S3 Object Lock (Compliance)', 'Bucket Policy'], correctOptionIndex: 2, explanation: 'S3 Object Lock in Compliance mode prevents deletion by ANY user, including root, until retention period expires.' },
    { id: 'sap-cim-9', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS Glue Data Catalog?', answer: 'Persistent metadata store for data assets.', explanation: 'Required for Athena and Redshift Spectrum to query S3 data.' },
    { id: 'sap-cim-10', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is Redshift Spectrum?', answer: 'Feature allowing Redshift to run SQL queries against exabytes of unstructured data in S3.', explanation: 'No loading required. Separates storage from compute.' },
    { id: 'sap-cim-11', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is EMR (Elastic MapReduce)?', answer: 'Managed Hadoop framework (Spark, HBase, Presto, etc.) for processing vast amounts of data.', explanation: 'Short-running clusters are best for cost (Spot instances).' },
    { id: 'sap-cim-12', type: 'QUIZ', category: 'SAP_PROFESSIONAL', question: 'Securely store and rotate database credentials used by Lambda.', options: ['Environment Variables', 'S3 Config File', 'Secrets Manager', 'Parameter Store (SecureString)'], correctOptionIndex: 2, explanation: 'Secrets Manager is designed to rotate credentials automatically (e.g., for RDS).' },
    { id: 'sap-cim-13', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS Macie?', answer: 'Uses ML to discover and protect sensitive data (PII) in S3.', explanation: 'Data privacy and compliance.' },
    { id: 'sap-cim-14', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is GuardDuty?', answer: 'Intelligent threat detection. Analyzes CloudTrail, VPC Flow Logs, and DNS Logs.', explanation: 'No agent required.' },
    { id: 'sap-cim-15', type: 'FLASHCARD', category: 'SAP_PROFESSIONAL', question: 'What is AWS Shield Advanced?', answer: 'Premium DDoS protection. 24/7 access to DRT (DDoS Response Team). Cost protection.', explanation: 'Free Shield Standard is always on.' },
    // --- HIGH-FIDELITY EXAM RECALL (20 Additional Cards) ---
    {
        id: 'hf-3-1',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the best multi-region strategy for RTO < 10m with SQL?',
        answer: 'Aurora Global Database + Write Forwarding + R53 ARC.',
        explanation: 'Provides <1s replication and managed failover orchestration via Application Recovery Controller.'
    },
    {
        id: 'hf-3-2',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'How do you handle 10Gbps DX across 4 Regions with 1 BGP session?',
        answer: 'Direct Connect Gateway (DXGW) + Transit VIF.',
        explanation: 'Enables a single DX connection to reach multiple Transit Gateways in different regions.'
    },
    {
        id: 'hf-3-3',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which Route 53 Resolver endpoint handles AWS -> On-premises resolution?',
        options: ['Inbound Endpoint', 'Outbound Endpoint', 'Shared Endpoint', 'VPC Endpoint'],
        correctOptionIndex: 1,
        explanation: 'Outbound endpoints forward queries from AWS to external DNS servers (like on-premises AD).'
    },
    {
        id: 'hf-3-4',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'Explain the "Compute Savings Plan" advantage for Multi-Service environments.',
        answer: 'Applies automatically to EC2, Fargate, AND Lambda across all regions.',
        explanation: 'Offers the highest flexibility for modern serverless + container architectures.'
    },
    {
        id: 'hf-3-5',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is "Appliance Mode" in Transit Gateway?',
        answer: 'Ensures symetric routing for traffic passing through centralized flow-inspection VPCs.',
        explanation: 'Prevents traffic from skipping the firewall on the return trip due to AZ stickiness.'
    },
    {
        id: 'hf-3-6',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which tool provides "Mandatory Guardrails" to protect logging in new accounts?',
        options: ['Organizations SCP', 'Control Tower', 'Config Rule', 'StackSets'],
        correctOptionIndex: 1,
        explanation: 'Control Tower applies a set of baseline SCPs (Mandatory Guardrails) to all accounts it manages.'
    },
    {
        id: 'hf-3-7',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the "Forest Trust" architecture for 50,000 users?',
        answer: 'Two-way Forest Trust between AWS Managed AD and On-prem AD.',
        explanation: 'Allows workloads to authenticate against on-prem without duplicating users or creating proxy bottlenecks.'
    },
    {
        id: 'hf-3-8',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'How do you handle "Overlay IPs" in AWS for SAP HANA HA?',
        answer: 'Transit Gateway (TGW) routes for the Overlay IP range.',
        explanation: 'Allows IP addresses outside the VPC CIDR to be routed to active nodes across AZs.'
    },
    {
        id: 'hf-3-9',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which modern mainframe migration approach requires the LEAST code change?',
        options: ['Refactor (Blu Age)', 'Replatform (Micro Focus)', 'Rehost (AWS MGN)', 'Retain'],
        correctOptionIndex: 1,
        explanation: 'Replatforming (e.g. Micro Focus) runs the original source code in an emulation layer on x86.'
    },
    {
        id: 'hf-3-10',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the "IoT Smart City" stack for 2M sensors + Anomaly Detection?',
        answer: 'IoT Rule -> Kinesis Data Streams -> Kinesis Data Analytics.',
        explanation: 'Provides real-time SQL/Flink analysis on exabytes of data with sub-second latency.'
    },
    {
        id: 'hf-3-11',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'Explain "ABAC" vs "RBAC" for Scalability.',
        answer: 'ABAC uses matching tags; RBAC uses static groups/roles.',
        explanation: 'ABAC scales without new roles (e.g., matching PrincipalTag:Project == ResourceTag:Project).'
    },
    {
        id: 'hf-3-12',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which report provides "Resource ID" granularity for Data Transfer costs?',
        options: ['Cost Explorer', 'AWS Budgets', 'CUR (Cost & Usage Report)', 'Trusted Advisor'],
        correctOptionIndex: 2,
        explanation: 'CUR is the most detailed data source, including individual resource IDs for every line item.'
    },
    {
        id: 'hf-3-13',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is an S3 "Legal Hold"?',
        answer: 'An indefinite WORM lock on an object with no expiration date.',
        explanation: 'Used for litigation where the end date of the requirement is unknown.'
    },
    {
        id: 'hf-3-14',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the "Cluster Placement Group" use case for SAP?',
        answer: 'Sub-millisecond latency between App Server and HANA DB.',
        explanation: 'Packs instances together on a high speed network in a single AZ.'
    },
    {
        id: 'hf-3-15',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which service supports IP Multicast?',
        options: ['VPC Peering', 'ALB', 'Transit Gateway', 'SNS'],
        correctOptionIndex: 2,
        explanation: 'Transit Gateway is the only AWS service with native support for IP Multicast routing.'
    },
    {
        id: 'hf-3-16',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is a "Permissions Boundary" used for in delegation?',
        answer: 'Restricts the MAX permissions project leads can grant to roles they create.',
        explanation: 'Ensures a "Lead" cannot accidentally or maliciously create an "Administrator" role.'
    },
    {
        id: 'hf-3-17',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'How do you trigger actions after a Control Tower account is created?',
        answer: 'EventBridge Lifecycle Event `CreateManagedAccount`.',
        explanation: 'Control Tower publishes events to the management account EventBridge bus.'
    },
    {
        id: 'hf-3-18',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which DR strategy uses "Data Hot, Compute Cold"?',
        options: ['Active-Active', 'Warm Standby', 'Pilot Light', 'Backup & Restore'],
        correctOptionIndex: 2,
        explanation: 'Pilot Light replicates data live but keeps servers off until a disaster occurs.'
    },
    {
        id: 'hf-3-19',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What helps consistent performance for Global Branch offices accessing Private APIs?',
        answer: 'AWS Global Accelerator.',
        explanation: 'Optimizes the path over the AWS backbone and provides a fixed Anycast IP entry point.'
    },
    {
        id: 'hf-3-20',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is "AWS ZDP" in relation to Aurora?',
        answer: 'Zero Downtime Patching.',
        explanation: 'Attempts to patch Aurora nodes without dropping active connections (best effort).'
    },
    {
        id: 'hf-3-21',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Amazon SageMaker Ground Truth?',
        answer: 'A fully managed data labeling service that makes it easy to build highly accurate training datasets for ML.',
        explanation: 'Uses machine learning and human labelers (via Mechanical Turk or private teams) to label data.'
    },
    {
        id: 'hf-3-22',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which tool allows you to centrally manage and automate the backup of data across AWS services and your on-premises workloads?',
        options: ['AWS Backup', 'AWS DataSync', 'AWS Storage Gateway', 'S3 Replication'],
        correctOptionIndex: 0,
        explanation: 'AWS Backup provides a centralized console to automate and manage backups across the organization.'
    },
    {
        id: 'hf-3-23',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is AWS Cloud Map?',
        answer: 'A cloud resource discovery service that allows you to define custom names for your application resources.',
        explanation: 'Increases application availability by having your applications always discover the most up-to-date locations of their dependencies.'
    },
    {
        id: 'hf-3-24',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the purpose of AWS App Mesh?',
        answer: 'A service mesh that provide application-level networking to make it easy for your services to communicate with each other.',
        explanation: 'Provides consistent visibility and network traffic control for every service in an application.'
    },
    {
        id: 'hf-3-25',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which service enables you to create a secure, private connection between your on-premises network and your VPC without using the public internet?',
        options: ['AWS Site-to-Site VPN', 'AWS Direct Connect', 'AWS PrivateLink', 'AWS Transit Gateway'],
        correctOptionIndex: 1,
        explanation: 'Direct Connect bypasses the internet to provide consistent, low-latency performance.'
    },
    {
        id: 'hf-3-26',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Amazon Macie?',
        answer: 'A fully managed data security and data privacy service that uses ML to discover and protect sensitive data in S3.',
        explanation: 'Automates disclosure of PII to help you meet compliance requirements.'
    },
    {
        id: 'hf-3-27',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is AWS Security Hub?',
        answer: 'A cloud security posture management service that performs security best practice checks and aggregates alerts.',
        explanation: 'Provides a comprehensive view of your high-priority security alerts and compliance status across accounts.'
    },
    {
        id: 'hf-3-28',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which tool provides global, integrated security policies for your web applications and APIs?',
        options: ['AWS WAF', 'AWS Shield', 'AWS Firewall Manager', 'Amazon Inspector'],
        correctOptionIndex: 2,
        explanation: 'Firewall Manager simplifies your security administration and maintenance tasks across multiple accounts and resources.'
    },
    {
        id: 'hf-3-29',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Amazon Kinesis Data Streams?',
        answer: 'A scalable and durable real-time data streaming service that can continuously capture gigabytes of data per second.',
        explanation: 'Ideal for real-time analytics, log-processing, and real-time dashboards.'
    },
    {
        id: 'hf-3-30',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is the benefit of AWS Proton?',
        answer: 'A fully managed delivery service for containerized and serverless applications.',
        explanation: 'Allows platform teams to define standard templates for infrastructure, while developers focus on code.'
    },
    {
        id: 'hf-3-31',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which service provides a highly available and scalable cloud Domain Name System (DNS) web service?',
        options: ['Amazon Route 53', 'AWS Global Accelerator', 'Amazon CloudFront', 'AWS PrivateLink'],
        correctOptionIndex: 0,
        explanation: 'Route 53 is designed to give developers and businesses an extremely reliable way to route end users to internet applications.'
    },
    {
        id: 'hf-3-32',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Amazon Athena?',
        answer: 'An interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.',
        explanation: 'Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.'
    },
    {
        id: 'hf-3-33',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is AWS Batch?',
        answer: 'A fully managed service that helps you run batch computing workloads of any scale.',
        explanation: 'Automatically provisions the optimal quantity and type of compute resources based on the quantity and specific resource requirements.'
    },
    {
        id: 'hf-3-34',
        type: 'QUIZ',
        category: 'SAP_PROFESSIONAL',
        question: 'Which AWS service makes it easy to coordinate the components of distributed applications using visual workflows?',
        options: ['AWS Step Functions', 'AWS Lambda', 'Amazon MQ', 'AWS Config'],
        correctOptionIndex: 0,
        explanation: 'Step Functions allows you to build complex state machines to manage long-running processes.'
    },
    {
        id: 'hf-3-35',
        type: 'FLASHCARD',
        category: 'SAP_PROFESSIONAL',
        question: 'What is Amazon FSx for Lustre?',
        answer: 'A high-performance file system optimized for fast processing of workloads such as machine learning and high performance computing.',
        explanation: 'Provides sub-millisecond latencies and high throughput (hundreds of GB/s) for compute-intensive workloads.'
    }
];
