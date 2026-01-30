
import { Phase, PhaseStatus, Course } from './types';

// Helper to create lessons quickly. Defaults to VIDEO type.
const l = (title: string, duration: string, type: 'VIDEO' | 'LAB' | 'QUIZ' = 'VIDEO') => ({ 
  id: Math.random().toString(36).substr(2, 9), 
  title, 
  duration, 
  type,
  isCompleted: false, 
  notes: [] 
});

const GOOGLE_IT_SUPPORT_MODULES = [
  {
    id: 'm-git-1',
    title: 'Course 1: Technical Support Fundamentals',
    isCompleted: false,
    lessons: [
      l('Module 1: Introduction to IT', '3h'),
      l('Module 2: Hardware', '4h'),
      l('Module 3: Operating System', '5h'),
      l('Module 4: Networking', '2h'),
      l('Module 5: Software', '4h'),
      l('Module 6: Troubleshooting', '2h')
    ]
  },
  {
    id: 'm-git-2',
    title: 'Course 2: The Bits and Bytes of Computer Networking',
    isCompleted: false,
    lessons: [
      l('Module 1: Introduction to Networking', '4h'),
      l('Module 2: The Network Layer', '3h'),
      l('Module 3: The Transport and Application Layers', '5h'),
      l('Module 4: Networking Services', '4h'),
      l('Module 5: Connecting to the Internet', '4h'),
      l('Module 6: Troubleshooting and the Future of Networking', '3h')
    ]
  },
  {
    id: 'm-git-3',
    title: 'Course 3: Operating Systems and You: Becoming a Power User',
    isCompleted: false,
    lessons: [
      l('Module 1: Navigating the System', '5h'),
      l('Module 2: Users and Permissions', '4h'),
      l('Module 3: Package and Software Management', '6h'),
      l('Module 4: Filesystems', '4h'),
      l('Module 5: Process Management', '4h'),
      l('Module 6: Operating Systems in Practice', '4h')
    ]
  },
  {
    id: 'm-git-4',
    title: 'Course 4: System Administration and IT Infrastructure Services',
    isCompleted: false,
    lessons: [
       l('Module 1: What is System Administration?', '2h'),
       l('Module 2: Network and Infrastructure Services', '9h'),
       l('Module 3: Software and Platform Services', '4h'),
       l('Module 4: Directory Services', '5h'),
       l('Module 5: Data Recovery & Backups', '2h'),
       l('Module 6: Final Project', '2h')
    ]
  },
  {
    id: 'm-git-5',
    title: 'Course 5: IT Security: Defense against the digital dark arts',
    isCompleted: false,
    lessons: [
       l('Module 1: Understanding Security Threats', '3h'),
       l('Module 2: Pelcgbybtl (Cryptology)', '6h'),
       l('Module 3: The 3 A\'s of Cybersecurity: Authentication, Authorization, Accounting', '2h'),
       l('Module 4: Securing Your Networks', '4h'),
       l('Module 5: Defense in Depth', '2h'),
       l('Module 6: Creating a Company Culture for Security', '3h'),
       l('Module 7: Streamline Workflows with AI', '2h')
    ]
  },
  {
    id: 'm-git-6',
    title: 'Course 6: Accelerate Your Job Search with AI',
    isCompleted: false,
    lessons: [
       l('Module 1: Uncover Your Transferable Skills with AI', '1h'),
       l('Module 2: Plan Your Job Search with AI', '2h'),
       l('Module 3: Manage Your Job Applications with AI', '1h'),
       l('Module 4: Prepare and Practice for Interviews with AI', '2h')
    ]
  }
];

const GOOGLE_PYTHON_MODULES = [
  {
    id: 'gp-1',
    title: 'Course 1: Crash Course on Python',
    isCompleted: false,
    lessons: [
      l('Hello Python!', '4h'),
      l('Basic Python Syntax', '4h'),
      l('Loops', '4h'),
      l('Strings, Lists and Dictionaries', '6h'),
      l('Final Project', '3h', 'LAB')
    ]
  },
  {
    id: 'gp-2',
    title: 'Course 2: Using Python to Interact with the Operating System',
    isCompleted: false,
    lessons: [
      l('Getting Your Python On', '3h'),
      l('Managing Files with Python', '6h'),
      l('Regular Expressions', '5h'),
      l('Managing Data and Processes', '5h'),
      l('Testing in Python', '7h'),
      l('Bash Scripting', '5h'),
      l('Final Project', '3h', 'LAB')
    ]
  },
  {
    id: 'gp-3',
    title: 'Course 3: Introduction to Git and GitHub',
    isCompleted: false,
    lessons: [
      l('Introduction to Version Control', '5h'),
      l('Using Git Locally', '5h'),
      l('Working with Remotes', '5h'),
      l('Collaboration', '5h')
    ]
  },
  {
    id: 'gp-4',
    title: 'Course 4: Troubleshooting and Debugging Techniques',
    isCompleted: false,
    lessons: [
      l('Troubleshooting Concepts', '4h'),
      l('Slowness', '4h'),
      l('Crashing Programs', '5h'),
      l('Managing Resources', '5h')
    ]
  },
  {
    id: 'gp-5',
    title: 'Course 5: Configuration Management and the Cloud',
    isCompleted: false,
    lessons: [
      l('Automating with Configuration Management', '5h'),
      l('Deploying Puppet', '5h'),
      l('Automation in the Cloud', '4h'),
      l('Managing Cloud Instances at Scale', '4h')
    ]
  },
  {
    id: 'gp-6',
    title: 'Course 6: Automating Real-World Tasks with Python',
    isCompleted: false,
    lessons: [
      l('Manipulating images', '3h', 'LAB'),
      l('Interacting with web services', '4h', 'LAB'),
      l('Automatic output generation', '4h', 'LAB'),
      l('Putting it all together', '5h', 'LAB'),
      l('Career resources', '1h')
    ]
  },
  {
    id: 'gp-7',
    title: 'Course 7: Accelerate Your Job Search with AI',
    isCompleted: false,
    lessons: [
      l('Uncover Your Transferable Skills with AI', '1h'),
      l('Plan Your Job Search with AI', '2h'),
      l('Manage Your Job Applications with AI', '1h'),
      l('Prepare and Practice for Interviews with AI', '2h')
    ]
  }
];

const CANTRILL_FUNDAMENTALS_MODULES = [
  {
    id: 'm-cf-intro',
    title: 'Course Introduction',
    isCompleted: false,
    lessons: [
      l('Connect with me and join the community', '3m'),
      l('SPECIAL OFFERS !!! READ ME', '5m')
    ]
  },
  {
    id: 'm-cf-osi',
    title: 'OSI 7-Layer Networking Model',
    isCompleted: false,
    lessons: [
      l('OSI Model Introduction', '5m'),
      l('Layer 1 - Physical', '10m'),
      l('Layer 2 - DataLink - PART1', '9m'),
      l('Layer 2 - DataLink - PART2', '15m'),
      l('Layer 3 - Network - PART1', '12m'),
      l('Layer 3 - Network - PART2', '19m'),
      l('Layer 3 - Network - PART3', '15m'),
      l('Layer 4&5 - Transport & Session - PART1', '16m'),
      l('Layer 4&5 - Transport & Session - PART2', '14m')
    ]
  },
  {
    id: 'm-cf-networking',
    title: 'Other Networking',
    isCompleted: false,
    lessons: [
      l('Network Address Translation (NAT) - PART1', '11m'),
      l('Network Address Translation (NAT) - PART2', '10m'),
      l('IP Address Space & Subnetting - PART1', '15m'),
      l('IP Address Space & Subnetting - PART2', '11m'),
      l('Distributed Denial of Service (DDOS) Attacks', '15m'),
      l('VLANs, TRUNKS & QinQ', '16m'),
      l('Decimal to Binary Conversion (IP Addressing)', '17m'),
      l('SSL & TLS', '11m'),
      l('Border Gateway Protocol (BGP) 101', '17m'),
      l('Stateful vs Stateless Firewalls', '14m'),
      l('JumboFrames', '5m'),
      l('Layer 7 Firewalls', '8m'),
      l('IP Sec VPN Fundamentals', '15m'),
      l('Fibre Optic Cable 101', '11m')
    ]
  },
  {
    id: 'm-cf-security',
    title: 'Security',
    isCompleted: false,
    lessons: [
      l('Encryption 101 - PART1', '14m'),
      l('Encryption 101 - PART2', '7m'),
      l('Envelope Encryption', '8m'),
      l('Hardware Security Modules (HSMs)', '7m'),
      l('Hash Functions & Hashing', '13m'),
      l('Digital Signatures', '9m')
    ]
  },
  {
    id: 'm-cf-dns',
    title: 'DNS & DNSSEC',
    isCompleted: false,
    lessons: [
      l('DNS #1 - What does DNS do', '3m'),
      l('DNS #2 - Why does DNS need a complex architecture', '13m'),
      l('DNS #3 - How DNS actually works ... walking the tree', '9m'),
      l('DNS #4 - What happens when a domain is registered?', '4m'),
      l('DNSSEC #1 - Why do we need DNSSEC', '11m'),
      l('DNSSEC #2 - How DNSSEC Works within a Zone', '18m'),
      l('DNSSEC #3 - DNSSEC Chain of Trust', '8m'),
      l('DNSSEC #4 - DNSSEC Root Signing Ceremony', '8m')
    ]
  },
  {
    id: 'm-cf-containers',
    title: 'Containers & Virtualization',
    isCompleted: false,
    lessons: [
      l('Kubernetes 101', '11m')
    ]
  },
  {
    id: 'm-cf-backup',
    title: 'Backups & DR',
    isCompleted: false,
    lessons: [
      l('Recovery Point Objective (RPO) & Recovery Time Objective (RTO)', '17m')
    ]
  },
  {
    id: 'm-cf-data',
    title: 'Data Formats & Configuration Formats',
    isCompleted: false,
    lessons: [
      l('YAML aint markup language (YAML) 101', '6m'),
      l('Javascript Object Notation (JSON) 101', '4m')
    ]
  },
  {
    id: 'm-cf-cloud',
    title: 'Cloud Computing 101',
    isCompleted: false,
    lessons: [
      l('What is Cloud Computing?', '14m'),
      l('Public vs Private vs Multi vs Hybrid Cloud', '9m'),
      l('Cloud Service Models (IAAS, PAAS, SAAS)', '10m')
    ]
  }
];

// FULL ADRIAN CANTRILL SAA-C03 CURRICULUM
const SAA_MODULES = [
  {
    id: 'saa-mod-intro',
    title: 'Introduction & Scenario',
    isCompleted: false,
    lessons: [
      l('Introduction', '5m'),
      l('AWS Exams', '18m'),
      l('Scenario - Animals4life', '14m'),
      l('Connect with other students', '4m')
    ]
  },
  {
    id: 'saa-mod-fund-accts',
    title: 'Course Fundamentals & Accounts',
    isCompleted: false,
    lessons: [
      l('AWS Accounts - The basics', '12m'),
      l('[DEMO] Creating an AWS Account', '6m', 'LAB'),
      l('Multi-factor Authentication (MFA)', '9m'),
      l('[DEMO] Adding MFA - Root User', '5m', 'LAB'),
      l('[DOITYOURSELF] Creating the Production Account', '15m', 'LAB'),
      l('IAM Basics', '14m'),
      l('[DEMO] Creating IAMADMIN user & MFA', '9m', 'LAB'),
      l('IAM Access Keys', '8m'),
      l('[DEMO] Creating Access keys & CLI tools', '18m', 'LAB')
    ]
  },
  {
    id: 'saa-mod-aws-fund',
    title: 'AWS Fundamentals',
    isCompleted: false,
    lessons: [
      l('AWS Public vs Private Services', '8m'),
      l('AWS Global Infrastructure', '15m'),
      l('AWS Default VPC', '16m'),
      l('EC2 Basics', '15m'),
      l('[DEMO] My First EC2 Instance - PART1', '11m', 'LAB'),
      l('[DEMO] My First EC2 Instance - PART2', '5m', 'LAB'),
      l('S3 Basics', '16m'),
      l('[DEMO] My First S3 Bucket', '19m', 'LAB'),
      l('CloudFormation (CFN) Basics', '13m'),
      l('[DEMO] Simple Automation With CFN', '16m', 'LAB'),
      l('CloudWatch Basics', '14m'),
      l('[Demo] Simple Monitoring with Cloudwatch', '16m', 'LAB'),
      l('Shared Responsibility Model', '7m'),
      l('High-Availability vs Fault-Tolerance vs DR', '18m'),
      l('Route53 Fundamentals', '7m'),
      l('[DEMO] Registering a Domain with route53', '10m', 'LAB'),
      l('DNS Record Types', '14m'),
      l('Fundamentals Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-iam',
    title: 'IAM, Accounts & Organizations',
    isCompleted: false,
    lessons: [
      l('IAM Identity Policies', '16m'),
      l('IAM Users and ARNs', '14m'),
      l('[DEMO] Simple Identity Permissions', '17m', 'LAB'),
      l('IAM Groups', '8m'),
      l('[DEMO] Permissions control using IAM Groups', '10m', 'LAB'),
      l('IAM Roles - The Tech', '9m'),
      l('When to use IAM Roles', '16m'),
      l('Service-linked Roles & PassRole', '6m'),
      l('AWS Organizations', '13m'),
      l('[DEMO] AWS Organizations', '20m', 'LAB'),
      l('Service Control Policies (SCPs)', '13m'),
      l('[DEMO] Using Service Control Policies', '17m', 'LAB'),
      l('CloudWatch Logs', '8m'),
      l('CloudTrail', '12m'),
      l('[DEMO] Implementing an Organizational Trail', '19m', 'LAB'),
      l('AWS Control Tower 101', '16m'),
      l('IAM & Orgs Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-s3',
    title: 'Simple Storage Service (S3)',
    isCompleted: false,
    lessons: [
      l('S3 Security (Resource Policies & ACLs)', '19m'),
      l('S3 Static Hosting', '11m'),
      l('[Demo] Creating a static website with S3', '18m', 'LAB'),
      l('Object Versioning & MFA Delete', '8m'),
      l('[DEMO] S3 Versioning', '16m', 'LAB'),
      l('S3 Performance Optimization', '12m'),
      l('[DEMO] S3 Performance', '6m', 'LAB'),
      l('Key Management Service (KMS)', '19m'),
      l('[DEMO] Encrypting battleplans with KMS', '13m', 'LAB'),
      l('S3 Object Encryption CSE/SSE', '24m'),
      l('[DEMO] Object Encryption and Role Separation', '15m', 'LAB'),
      l('S3 Bucket Keys', '6m'),
      l('S3 Object Storage Classes - PART1', '10m'),
      l('S3 Object Storage Classes - PART2', '12m'),
      l('S3 Lifecycle Configuration', '9m'),
      l('S3 Replication', '14m'),
      l('[DEMO] Cross-Region Replication', '20m', 'LAB'),
      l('S3 PreSigned URLs', '12m'),
      l('[DEMO] Creating and using PresignedURLs', '19m', 'LAB'),
      l('S3 Select and Glacier Select', '6m'),
      l('S3 Events', '5m'),
      l('S3 Access Logs', '4m'),
      l('S3 Object Lock', '10m'),
      l('S3 Access Points', '6m'),
      l('[DEMO] Multi-Region Access Points', '21m', 'LAB'),
      l('S3 Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-vpc',
    title: 'VPC Basics',
    isCompleted: false,
    lessons: [
      l('VPC Sizing and Structure - PART1', '12m'),
      l('VPC Sizing and Structure - PART2', '12m'),
      l('Custom VPCs - PART1 - THEORY', '11m'),
      l('[DEMO] Custom VPCs - PART2', '6m', 'LAB'),
      l('VPC Subnets', '11m'),
      l('[DEMO] Implement multi-tier VPC subnets', '16m', 'LAB'),
      l('VPC Routing, IGW & Bastion Hosts', '18m'),
      l('[DEMO] Configuring A4L public subnets - PART1', '14m', 'LAB'),
      l('[DEMO] Configuring A4L public subnets - PART2', '12m', 'LAB'),
      l('Stateful vs Stateless Firewalls', '15m'),
      l('Network Access Control Lists (NACLs)', '13m'),
      l('Security Groups (SG)', '12m'),
      l('NAT & NAT Gateway - PART1', '14m'),
      l('NAT & NAT Gateway - PART2', '12m'),
      l('[DEMO] Implementing private internet access', '20m', 'LAB'),
      l('VPC Basics Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-ec2',
    title: 'EC2 Basics',
    isCompleted: false,
    lessons: [
      l('Virtualization 101', '13m'),
      l('EC2 Architecture and Resilience', '13m'),
      l('EC2 Instance Types - PART1', '12m'),
      l('EC2 Instance Types - PART2', '9m'),
      l('[DEMO] EC2 SSH vs EC2 Instance Connect', '18m', 'LAB'),
      l('Storage Refresher', '15m'),
      l('EBS Service Architecture', '9m'),
      l('EBS Volume Types', '10m'),
      l('EBS IOPS & HDD', '11m'),
      l('Instance Store Volumes', '9m'),
      l('Instance Store vs EBS', '9m'),
      l('Snapshots, Restore & FSR', '11m'),
      l('[DEMO] EBS Volumes - PART1', '16m', 'LAB'),
      l('[DEMO] EBS Volumes - PART2', '15m', 'LAB'),
      l('[DEMO] EBS Volumes - PART3', '15m', 'LAB'),
      l('EBS Encryption', '9m'),
      l('Network Interfaces, IPs and DNS', '16m'),
      l('[DEMO] Manual Install of Wordpress - PART1', '13m', 'LAB'),
      l('[DEMO] Manual Install of Wordpress - PART2', '13m', 'LAB'),
      l('Amazon Machine Images (AMI)', '14m'),
      l('[DEMO] Creating an Animals4life AMI - PART1', '10m', 'LAB'),
      l('[DEMO] Creating an Animals4life AMI - PART2', '11m', 'LAB'),
      l('[DEMO] Copying & Sharing an AMI', '9m', 'LAB'),
      l('EC2 Purchase Options - PART1', '10m'),
      l('EC2 Purchase Options - PART2', '12m'),
      l('Reserved Instances', '12m'),
      l('Instance Status Checks & Auto Recovery', '8m'),
      l('[DEMO] Shutdown, Terminate & Protection', '6m', 'LAB'),
      l('Horizontal & Vertical Scaling', '12m'),
      l('Instance Metadata', '16m'),
      l('EC2 Basics Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-containers',
    title: 'Containers & ECS',
    isCompleted: false,
    lessons: [
      l('Introduction to Containers', '18m'),
      l('[DEMO] Creating container of cats Image', '19m', 'LAB'),
      l('ECS - Concepts', '11m'),
      l('ECS - Cluster Mode', '14m'),
      l('[DEMO] Deploying container of cats Fargate', '14m', 'LAB'),
      l('Elastic Container Registry (ECR)', '5m'),
      l('Kubernetes 101', '12m'),
      l('EKS 101', '7m'),
      l('Containers Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-ec2-adv',
    title: 'Advanced EC2',
    isCompleted: false,
    lessons: [
      l('Bootstrapping EC2 using User Data', '11m'),
      l('[DEMO] Bootstrapping Wordpress - PART1', '15m', 'LAB'),
      l('[DEMO] Bootstrapping Wordpress - PART2', '7m', 'LAB'),
      l('Enhanced Bootstrapping with CFN-INIT', '12m'),
      l('[DEMO] CFN-INIT and CFN Creation Policies', '13m', 'LAB'),
      l('EC2 Instance Roles & Profile', '5m'),
      l('[DEMO] Using EC2 Instance Roles', '14m', 'LAB'),
      l('SSM Parameter Store', '7m'),
      l('[DEMO] Parameter Store', '17m', 'LAB'),
      l('System and Application Logging on EC2', '7m'),
      l('[DEMO] CloudWatch Agent - PART1', '12m', 'LAB'),
      l('[DEMO] CloudWatch Agent - PART2', '9m', 'LAB'),
      l('EC2 Placement Groups', '15m'),
      l('Dedicated Hosts', '9m'),
      l('Enhanced Networking & EBS Optimized', '7m'),
      l('Advanced EC2 Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-r53',
    title: 'Route 53 - Global DNS',
    isCompleted: false,
    lessons: [
      l('R53 Public Hosted Zones', '7m'),
      l('R53 Private Hosted Zones', '6m'),
      l('CNAME vs R53 Alias', '6m'),
      l('Simple Routing', '3m'),
      l('R53 Health Checks', '13m'),
      l('Failover Routing', '2m'),
      l('[DEMO] R53 and Failover Routing-PART1', '17m', 'LAB'),
      l('[DEMO] R53 and Failover Routing-PART2', '7m', 'LAB'),
      l('Multi Value Routing', '3m'),
      l('Weighted Routing', '4m'),
      l('Latency Routing', '3m'),
      l('Geolocation Routing', '6m'),
      l('Geoproximity', '5m'),
      l('R53 Interoperability', '12m'),
      l('Implementing DNSSEC using Route53', '18m'),
      l('Route53 Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-rds',
    title: 'Relational Database Service (RDS)',
    isCompleted: false,
    lessons: [
      l('Database Refresher & MODELS - PART1', '9m'),
      l('Database Refresher & MODELS - PART2', '15m'),
      l('ACID vs BASE', '12m'),
      l('Databases on EC2', '14m'),
      l('[DEMO] Splitting Wordpress Monolith', '19m', 'LAB'),
      l('RDS Architecture', '12m'),
      l('[DEMO] Migrating EC2 DB into RDS - PART1', '19m', 'LAB'),
      l('[DEMO] Migrating EC2 DB into RDS - PART2', '13m', 'LAB'),
      l('RDS MultiAZ - Instance and Cluster', '12m'),
      l('RDS Automatic Backup, Snapshots and Restore', '9m'),
      l('RDS Read-Replicas', '7m'),
      l('[DEMO] MultiAZ & Snapshot Restore - PART1', '15m', 'LAB'),
      l('[DEMO] MultiAZ & Snapshot Restore - PART2', '13m', 'LAB'),
      l('RDS Data Security', '8m'),
      l('RDS Custom', '6m'),
      l('Aurora Architecture', '14m'),
      l('Aurora Serverless', '10m'),
      l('Aurora Global Database', '6m'),
      l('Multi-master writes', '8m'),
      l('RDS Proxy', '10m'),
      l('Database Migration Service (DMS)', '12m'),
      l('RDS Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-ha',
    title: 'HA & Scaling',
    isCompleted: false,
    lessons: [
      l('Regional and Global AWS Architecture', '11m'),
      l('Evolution of the Elastic Load Balancer', '5m'),
      l('ELB Architecture - PART1', '11m'),
      l('ELB Architecture - PART2', '13m'),
      l('ALB vs NLB', '17m'),
      l('Launch Configuration and Templates', '4m'),
      l('Auto-Scaling Groups (ASG)', '17m'),
      l('ASG Scaling Policies', '11m'),
      l('ASG Lifecycle Hooks', '5m'),
      l('ASG HealthCheck Comparison', '4m'),
      l('SSL Offload & Session Stickiness', '13m'),
      l('[DEMO] Seeing Session Stickiness in Action', '13m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE1', '25m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE2', '13m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE3', '20m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE4', '19m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE5', '26m', 'LAB'),
      l('[AdvancedDemo] Architecture Evolution - STAGE6', '6m', 'LAB'),
      l('Gateway Load Balancer', '14m'),
      l('HA and Scaling Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-serverless',
    title: 'Serverless & App Services',
    isCompleted: false,
    lessons: [
      l('Architecture Deep Dive', '22m'),
      l('AWS Lambda - PART1', '12m'),
      l('AWS Lambda - PART2', '14m'),
      l('AWS Lambda - PART3', '18m'),
      l('CloudWatchEvents and EventBridge', '7m'),
      l('[DEMO] Automated EC2 Control - PART1', '14m', 'LAB'),
      l('[DEMO] Automated EC2 Control - PART2', '19m', 'LAB'),
      l('Serverless Architecture', '13m'),
      l('Simple Notification Service (SNS)', '8m'),
      l('Step Functions', '17m'),
      l('API Gateway 101', '17m'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART1', '5m', 'LAB'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART2', '9m', 'LAB'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART3', '13m', 'LAB'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART4', '13m', 'LAB'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART5', '14m', 'LAB'),
      l('[MINIPROJECT] Pet-Cuddle-o-Tron - PART6', '3m', 'LAB'),
      l('Simple Queue Service (SQS)', '16m'),
      l('SQS Standard vs FIFO vs Delay vs Dead-Letter', '12m'),
      l('Kinesis Data Streams/Firehose/Analytics', '26m'),
      l('Kinesis Video Streams', '6m'),
      l('Amazon Cognito', '15m'),
      l('AWS Glue 101', '7m'),
      l('Amazon MQ 101', '9m'),
      l('Amazon AppFlow', '4m'),
      l('Serverless Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-cdn',
    title: 'Global Content Delivery',
    isCompleted: false,
    lessons: [
      l('Cloudfront Architecture', '15m'),
      l('CloudFront (CF) - Behaviours', '10m'),
      l('CloudFront - TTL and Invalidations', '14m'),
      l('ACM', '12m'),
      l('Cloudfront and SSL/TLS', '15m'),
      l('CF Origin Types & Architecture', '11m'),
      l('[DEMO] CF - CDN for static Website - PART1', '17m', 'LAB'),
      l('[DEMO] CF - CDN for static Website - PART2', '13m', 'LAB'),
      l('[DEMO] CF - Adding an Alternate CNAME and SSL', '12m', 'LAB'),
      l('Securing CF and S3 using OAI', '9m'),
      l('CloudFront - Private Distribution & Behaviours', '8m'),
      l('[DEMO] CF - Using Origin Access Control (OAC)', '12m', 'LAB'),
      l('Lambda@Edge', '9m'),
      l('Global Accelerator', '11m'),
      l('CDN Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-adv-vpc',
    title: 'Advanced VPC Networking',
    isCompleted: false,
    lessons: [
      l('VPC Flow Logs', '10m'),
      l('Egress-Only Internet gateway', '7m'),
      l('VPC Endpoints (Gateway)', '12m'),
      l('VPC Endpoints (Interface)', '12m'),
      l('[DEMO] VPC Endpoints - Interface', '12m', 'LAB'),
      l('[DEMO] VPC Endpoints - Gateway', '10m', 'LAB'),
      l('[DEMO] Egress-Only Internet Gateway', '8m', 'LAB'),
      l('VPC Peering', '10m'),
      l('[DEMO] VPC Peering', '23m', 'LAB'),
      l('Advanced VPC Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-hybrid',
    title: 'Hybrid & Migration',
    isCompleted: false,
    lessons: [
      l('Border Gateway Protocol 101', '18m'),
      l('IPSec VPN Fundamentals', '15m'),
      l('AWS Site-to-Site VPN', '19m'),
      l('[DEMO] Simple Site2Site VPN (Setup)', '50m', 'LAB'),
      l('Direct Connect (DX) Concepts & Resilience', '24m'),
      l('DX - Public VIF + VPN', '7m'),
      l('Transit Gateway', '11m'),
      l('Storage Gateway (Volume/Tape/File)', '41m'),
      l('Snowball / Edge / Snowmobile', '11m'),
      l('Directory Service', '16m'),
      l('DataSync', '10m'),
      l('FSx for Windows/Lustre', '26m'),
      l('AWS Transfer Family', '11m'),
      l('Hybrid and Migration Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-iac',
    title: 'Infrastructure as Code',
    isCompleted: false,
    lessons: [
      l('CloudFormation Physical & Logical Resources', '8m'),
      l('[DEMO] Simple Non Portable Template', '22m', 'LAB'),
      l('CFN Template and Pseudo Parameters', '7m'),
      l('CFN Intrinsic Functions', '15m'),
      l('CFN Mappings/Outputs/Conditions', '16m'),
      l('[DEMO] Template v2 - Portable', '14m', 'LAB'),
      l('CFN DependsOn & Wait Conditions', '19m'),
      l('CFN Nested Stacks & Cross-Stack Refs', '24m'),
      l('CFN Stack Sets', '10m'),
      l('CFN Deletion Policy & Stack Roles', '12m'),
      l('CFN Init (CFN-INIT) & cfn-hup', '13m'),
      l('[DEMO] wait conditions, cfnsignal, cfninit', '27m', 'LAB'),
      l('CloudFormation Custom Resources', '12m'),
      l('[DEMO] CloudFormation Custom Resources', '23m', 'LAB')
    ]
  },
  {
    id: 'saa-mod-nosql',
    title: 'NoSQL & DynamoDB',
    isCompleted: false,
    lessons: [
      l('DynamoDB - Architecture', '11m'),
      l('DynamoDB - Operations, Consistency', '25m'),
      l('DynamoDB Local and Global Secondary Indexes', '13m'),
      l('DynamoDB - Streams, Lambda, Global Tables', '19m'),
      l('DynamoDB - Accelerator (DAX) & TTL', '16m'),
      l('Amazon Athena', '9m'),
      l('[DEMO] Athena Demo', '25m', 'LAB'),
      l('Elasticache', '13m'),
      l('Redshift Architecture & DR', '15m'),
      l('NoSQL Section Quiz', '10m', 'QUIZ')
    ]
  },
  {
    id: 'saa-mod-exam',
    title: 'Exam Preparation',
    isCompleted: false,
    lessons: [
      l('General AWS Exam Technique', '9m'),
      l('General AWS Question Technique', '23m'),
      l('Practice Exam #1', '120m', 'QUIZ'),
      l('Practice Exam #2', '120m', 'QUIZ')
    ]
  }
];

// FULL ADRIAN CANTRILL SAP-C02 CURRICULUM
const SAP_MODULES = [
  {
    id: 'sap-mod-intro',
    title: 'INTRODUCTION & SCENARIO',
    isCompleted: false,
    lessons: [
      l('Public Introduction', '4m'),
      l('NEW VERSION OF SA PRO (SAP-C02)', '5m'),
      l('AWS Exams', '17m'),
      l('Course Scenario', '13m'),
      l('Connect with other students', '3m'),
      l('COURSE UPGRADES', '2m'),
      l('IF YOU CAN\'T PLAY VIDEOS - READ ME', '2m'),
      l('SHARED LESSONS EXPLAINED', '2m'),
      l('ENABLE EMAIL UPDATES', '2m')
    ]
  },
  {
    id: 'sap-mod-accts',
    title: 'COURSE AWS ACCOUNTS',
    isCompleted: false,
    lessons: [
      l('AWS Accounts', '11m'),
      l('[DEMO] Creating an AWS Account', '5m', 'LAB'),
      l('Multi-factor Authentication (MFA)', '8m'),
      l('[DEMO] Adding MFA - Root User', '4m', 'LAB'),
      l('[DOITYOURSELF] Creating the Production Account', '15m', 'LAB'),
      l('[DEMO] Creating IAMADMIN user & adding MFA', '8m', 'LAB'),
      l('IAM Access Keys', '7m'),
      l('[DEMO] Creating Access keys & AWS CLI', '17m', 'LAB')
    ]
  },
  {
    id: 'sap-mod-techfund',
    title: 'Networking and Technical Fundamentals',
    isCompleted: false,
    lessons: [
      l('TECH FUNDAMENTALS CONTENT (READ ME)', '5m')
    ]
  },
  {
    id: 'sap-mod-adv-perm',
    title: 'ADVANCED PERMISSIONS & ACCOUNTS',
    isCompleted: false,
    lessons: [
        l('[ASSOCIATESHARED] AWS Organizations', '12m'),
        l('[SHAREDALL] [DEMO] AWS Organizations', '19m', 'LAB'),
        l('[ASSOCIATESHARED] Service Control Policies (SCP)', '12m'),
        l('[SHAREDALL] [DEMO] Using Service Control Policies', '16m', 'LAB'),
        l('Security Token Service (STS)', '6m'),
        l('Revoking IAM Role Temporary Security Credentials', '9m'),
        l('[DEMO] Revoking Temporary Credentials - PART1', '12m', 'LAB'),
        l('[DEMO] Revoking Temporary Credentials - PART2', '10m', 'LAB'),
        l('Policy Interpretation Deep Dive - Example 1', '10m'),
        l('Policy Interpretation Deep Dive - Example 2', '9m'),
        l('Policy Interpretation Deep Dive - Example 3', '10m'),
        l('Permissions Boundaries & Use-cases', '17m'),
        l('AWS Permissions Evaluation', '10m'),
        l('[DEMO] Cross Account Access to S3 - SETUP - STAGE1', '4m', 'LAB'),
        l('[DEMO] Cross Account Access to S3 - ACL - STAGE2', '9m', 'LAB'),
        l('[DEMO] Cross Account Access to S3 - BUCKET POLICY - STAGE3', '9m', 'LAB'),
        l('[DEMO] Cross Account Access to S3 - ROLE - STAGE4', '8m', 'LAB'),
        l('AWS Resource Access Manager (RAM)', '14m'),
        l('[DEMO] Shared ORG VPC - PART1', '10m', 'LAB'),
        l('[DEMO] Shared ORG VPC - PART2', '16m', 'LAB'),
        l('Service Quotas', '13m'),
        l('SECTION QUIZ - ADVANCED PERMISSIONS & ACCOUNTS', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-adv-id',
    title: 'ADVANCED IDENTITIES & FEDERATION',
    isCompleted: false,
    lessons: [
        l('SAML2.0 Identity Federation', '12m'),
        l('IAM Identity Center', '9m'),
        l('[DEMO] Adding SSO to Animals4life ORG - PART1', '14m', 'LAB'),
        l('[DEMO] Adding SSO to Animals4life ORG - PART2', '12m', 'LAB'),
        l('Amazon Cognito - User and Identity Pools', '14m'),
        l('[MINIPROJECT] Web Identity Federation - PART1', '7m', 'LAB'),
        l('[MINIPROJECT] Web Identity Federation - PART2', '7m', 'LAB'),
        l('[MINIPROJECT] Web Identity Federation - PART3', '8m', 'LAB'),
        l('[MINIPROJECT] Web Identity Federation - PART4', '12m', 'LAB'),
        l('[MINIPROJECT] Web Identity Federation - PART5', '2m', 'LAB'),
        l('Amazon Workspaces', '7m'),
        l('[DEMO] Workspaces with AWS Directory Service - PART1', '7m', 'LAB'),
        l('[DEMO] Workspaces with AWS Directory Service - PART 2', '14m', 'LAB'),
        l('Directory Service Deep Dive (Microsoft AD)', '10m'),
        l('Directory Service Deep Dive (AD Connector)', '7m'),
        l('[DEMO] Hybrid directory solution - PART1', '7m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART2', '12m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART3', '13m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART4', '19m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART5', '14m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART6', '18m', 'LAB'),
        l('[DEMO] Hybrid directory solution - PART7', '4m', 'LAB'),
        l('AWS Control Tower 101', '15m'),
        l('SECTION QUIZ - ADVANCED IDENTITIES & FEDERATION', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-net-hybrid',
    title: 'NETWORKING & HYBRID',
    isCompleted: false,
    lessons: [
        l('Private and Public AWS Services', '7m'),
        l('DHCP In a VPC', '7m'),
        l('VPC Router Deep Dive', '13m'),
        l('Stateful vs Stateless Firewalls', '14m'),
        l('Network Access Control Lists (NACL)', '12m'),
        l('Security Groups', '11m'),
        l('AWS Local Zones', '8m'),
        l('Border Gateway Protocol 101', '17m'),
        l('AWS Global Accelerator', '10m'),
        l('IP Sec VPN Fundamentals', '14m'),
        l('Site2SiteVPN Refresher', '18m'),
        l('Transit Gateway Refresher', '10m'),
        l('Transit gateway Deep Dive', '14m'),
        l('Advanced VPC Routing - PART1', '11m'),
        l('Advanced VPC Routing - PART2', '11m'),
        l('Accelerated Site-to-Site VPN', '9m'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE1', '10m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE2 - PART1', '13m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE2 - PART2', '11m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE3 - PART1', '13m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE3 - PART2', '8m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE4', '21m', 'LAB'),
        l('[AdvancedDEMO] Advanced Site-to-Site VPN - STAGE5', '3m', 'LAB'),
        l('AWS Client VPN', '6m'),
        l('[DEMO] Client VPN - SETUP', '1m', 'LAB'),
        l('[DEMO] Client VPN - Directory', '3m', 'LAB'),
        l('[DEMO] Client VPN - Certificates', '5m', 'LAB'),
        l('[DEMO] Client VPN - Create Endpoint', '5m', 'LAB'),
        l('[DEMO] Client VPN - Configure Endpoint', '2m', 'LAB'),
        l('[DEMO] Client VPN - Install and test', '4m', 'LAB'),
        l('[DEMO] Client VPN - Cleanup', '2m', 'LAB'),
        l('AWS Direct Connect (DX) - Concepts', '9m'),
        l('AWS Direct Connect (DX) - Physical Connection', '4m'),
        l('AWS Direct Connect (DX) - Security (MACSec)', '11m'),
        l('AWS Direct Connect (DX) - Connection Process', '5m'),
        l('AWS Direct Connect (DX) - BGP Session + VLAN', '6m'),
        l('AWS Direct Connect (DX) - Private VIFs', '11m'),
        l('AWS Direct Connect (DX) - Public VIFs', '6m'),
        l('AWS Direct Connect (DX) - Public VIF + VPN', '6m'),
        l('AWS Direct Connect (DX) - Gateway', '11m'),
        l('AWS Direct Connect (DX) - Transit VIFs and TGW', '11m'),
        l('AWS Direct Connect (DX) - Resilience', '13m'),
        l('AWS Direct Connect (DX) - LAGs', '5m'),
        l('Route53 Fundamentals', '6m'),
        l('[DEMO] Registering a Domain with route53', '9m', 'LAB'),
        l('DNS Record Types', '13m'),
        l('R53 Public Hosted Zones', '6m'),
        l('R53 Private Hosted Zones', '5m'),
        l('CNAME vs R53 Alias', '5m'),
        l('Simple Routing', '2m'),
        l('R53 Health Checks', '12m'),
        l('Failover Routing', '1m'),
        l('[DEMO] Using R53 and Failover Routing-PART1', '16m', 'LAB'),
        l('[DEMO] Using R53 and Failover Routing-PART2', '6m', 'LAB'),
        l('Multi Value Routing', '2m'),
        l('Weighted Routing', '3m'),
        l('Latency Routing', '2m'),
        l('Geolocation Routing', '5m'),
        l('Geoproximity Routing', '4m'),
        l('R53 Interoperability', '11m'),
        l('Implementing DNSSEC using Route53', '17m'),
        l('AWS Private Link', '8m'),
        l('VPC Endpoints - Gateway', '11m'),
        l('VPC Endpoints - Interface', '11m'),
        l('VPC Endpoint Policies & Bucket Policies', '12m'),
        l('[DEMO] Private S3 Buckets - PART1 - SETUP', '8m', 'LAB'),
        l('[DEMO] Private S3 Buckets - PART2', '17m', 'LAB'),
        l('Advanced VPC DNS & DNS Endpoints', '15m'),
        l('[MINIPROJECT] Hybrid R53 and On-premises DNS-PART1', '8m', 'LAB'),
        l('[MINIPROJECT] Hybrid R53 and On-premises DNS-PART2', '6m', 'LAB'),
        l('[MINIPROJECT] Hybrid R53 and On-premises DNS-PART3', '15m', 'LAB'),
        l('[MINIPROJECT] Hybrid R53 and On-premises DNS-PART4', '9m', 'LAB'),
        l('IPv6 Capability in VPCs - PART1', '10m'),
        l('IPv6 Capability in VPCs - PART2', '11m'),
        l('Advanced VPC Structure - How Many AZs ?', '11m'),
        l('Advanced VPC Structure - Subnets & Tiers - PART1', '7m'),
        l('Advanced VPC Structure - Subnets & Tiers - PART2', '14m'),
        l('SECTION QUIZ - NETWORKING & HYBRID', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-storage',
    title: 'STORAGE SERVICES',
    isCompleted: false,
    lessons: [
        l('FSx for Windows File Server', '11m'),
        l('FSx for Lustre', '13m'),
        l('EFS Refresher', '9m'),
        l('[DEMO] Implementing EFS - PART1', '8m', 'LAB'),
        l('[DEMO] Implementing EFS - PART2', '11m', 'LAB'),
        l('S3 Object Storage Classes - PART1', '9m'),
        l('S3 Object Storage Classes - PART2', '11m'),
        l('S3 Lifecycle Configuration', '8m'),
        l('S3 Replication', '13m'),
        l('[DEMO] Cross-Region Replication of an S3 Static Website', '19m', 'LAB'),
        l('S3 Object Encryption CSE/SSE', '23m'),
        l('[DEMO] Object Encryption and Role Separation', '14m', 'LAB'),
        l('S3 Bucket Keys', '5m'),
        l('S3 Presigned URLs', '11m'),
        l('[DEMO] Creating and using PresignedURLs', '18m', 'LAB'),
        l('S3 Select & Glacier Select', '5m'),
        l('S3 Access Points', '5m'),
        l('S3 Object Lock', '9m'),
        l('Amazon Macie', '12m'),
        l('[DEMO] Amazon Macie', '15m', 'LAB'),
        l('EBS Volume Types - General Purpose', '9m'),
        l('EBS Volume Types - Provisioned IOPS', '6m'),
        l('EBS Volume Types - HDD-Based', '4m'),
        l('Instance Store Volumes - Architecture', '9m'),
        l('Choosing Between the EC2 Instance Store and EBS', '8m'),
        l('AWS Transfer Family', '10m'),
        l('SECTION QUIZ - STORAGE SERVICES', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-compute',
    title: 'COMPUTE, SCALING & LOAD BALANCING',
    isCompleted: false,
    lessons: [
        l('Regional and Global AWS Architecture', '10m'),
        l('EC2 Purchase Options - PART1', '9m'),
        l('EC2 Purchase Options - PART2', '11m'),
        l('Reserved Instances - the rest', '11m'),
        l('EC2 Networking', '16m'),
        l('Bootstrapping vs AMI Baking', '17m'),
        l('Elastic Load Balancer Architecture - PART1', '10m'),
        l('Elastic Load Balancer Architecture (ELB) - PART2', '12m'),
        l('Session State', '9m'),
        l('ELB Evolution', '4m'),
        l('Application Load balancing (ALB) vs Network Load Balancing (NLB)', '16m'),
        l('Session Stickiness', '9m'),
        l('[DEMO] Seeing Session Stickiness in Action', '12m', 'LAB'),
        l('Auto Scaling Groups (ASG) - Refresher', '16m'),
        l('Auto Scaling Groups (ASG) - Lifecycle Hooks', '4m'),
        l('Auto Scaling Groups (ASG) - Scaling Policies', '10m'),
        l('Auto Scaling Groups (ASG) - HealthChecks', '3m'),
        l('Connection Draining', '3m'),
        l('X-Forwarded-For & Proxy Protocol', '7m'),
        l('[AdvancedDemo] Architecture Evolution - STAGE1 - PART1', '14m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE1 - PART2', '10m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE2', '12m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE3', '19m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE4', '18m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE 5 - PART1', '11m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE 5 - PART2', '14m', 'LAB'),
        l('[AdvancedDemo] Architecture Evolution - STAGE6', '5m', 'LAB'),
        l('EC2 Placement Groups', '14m'),
        l('Gateway Load Balancer (GWLB)', '13m'),
        l('SECTION QUIZ - COMPUTE, SCALING & LOAD BALANCING', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-monitoring',
    title: 'MONITORING, LOGGING & COST MANAGEMENT',
    isCompleted: false,
    lessons: [
        l('CloudWatch-PART1', '9m'),
        l('CloudWatch-PART2', '9m'),
        l('CloudWatch Logs', '13m'),
        l('CloudTrail Refresher', '11m'),
        l('[DEMO] Implementing an Organizational Trail', '18m', 'LAB'),
        l('AWS X-Ray', '6m'),
        l('Cost Allocation Tags', '4m'),
        l('Trusted Advisor', '8m'),
        l('Section Quiz - Logging, Monitoring & Cost Management', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-databases',
    title: 'DATABASES',
    isCompleted: false,
    lessons: [
        l('Relational Database Service (RDS) Architecture', '11m'),
        l('RDS MultiAZ - Instance and Cluster', '11m'),
        l('RDS Backups and Restores', '8m'),
        l('RDS Read-Replicas', '6m'),
        l('RDS Data Security', '7m'),
        l('Aurora Architecture', '13m'),
        l('Aurora Serverless Architecture', '9m'),
        l('Aurora Multi-Master', '7m'),
        l('RDS Proxy', '9m'),
        l('RDS Custom', '5m'),
        l('DynamoDB Architecture Basics', '10m'),
        l('DynamoDB Operations, Consistency and Performance - PART1', '13m'),
        l('DynamoDB Operations, Consistency and Performance - PART2', '11m'),
        l('DynamoDB Indexes (LSI and GSI)', '12m'),
        l('DynamoDB Streams and Triggers', '9m'),
        l('DynamoDB Accelerator (DAX)', '10m'),
        l('DynamoDB Global Tables', '5m'),
        l('DynamoDB Time-To-Live (TTL)', '4m'),
        l('AWS Elasticsearch', '7m'),
        l('Athena', '8m'),
        l('[DEMO] Athena - Part 1', '13m', 'LAB'),
        l('[DEMO] Athena - Part 2', '11m', 'LAB'),
        l('Amazon Neptune', '6m'),
        l('Amazon Quantum Ledger Database (QLDB)', '6m'),
        l('SECTION QUIZ - DATABASES', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-analytics',
    title: 'DATA ANALYTICS',
    isCompleted: false,
    lessons: [
        l('Kinesis Data Streams', '7m'),
        l('Kinesis Data Firehose - Advanced', '9m'),
        l('Kinesis Data Analytics - Advanced', '8m'),
        l('MapReduce 101', '10m'),
        l('EMR Architecture', '13m'),
        l('Redshift Architecture', '11m'),
        l('Redshift Resilience and Recovery', '3m'),
        l('AWS Batch', '14m'),
        l('AWS QuickSight', '4m'),
        l('SECTION QUIZ - DATA ANALYTICS', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-appservices',
    title: 'APP SERVICES, CONTAINERS & SERVERLESS',
    isCompleted: false,
    lessons: [
        l('Introduction to containers', '17m'),
        l('[DEMO] Creating container of cats Docker Image', '18m', 'LAB'),
        l('ECS - Concepts', '10m'),
        l('ECS - Cluster Types', '13m'),
        l('[DEMO] - Deploying container of cats using Fargate', '13m', 'LAB'),
        l('Kubernetes 101', '11m'),
        l('Elastic Kubernetes Service (EKS) 101', '6m'),
        l('Simple Notification Service (SNS)', '7m'),
        l('Simple Queue Service [SQS]', '15m'),
        l('SQS Standard vs FIFO Queues', '3m'),
        l('SQS Extended Client Library', '2m'),
        l('SQS Delay Queues', '4m'),
        l('SQS Dead-Letter Queues', '4m'),
        l('Amazon MQ', '8m'),
        l('AWS Lambda - PART1', '11m'),
        l('AWS Lambda - PART2', '13m'),
        l('AWS Lambda - PART3', '17m'),
        l('Lambda Handler Architecture & Overview - PART1', '7m'),
        l('Lambda Handler Architecture & Overview - PART2', '10m'),
        l('Lambda Versions', '4m'),
        l('Lambda Aliases', '4m'),
        l('[DEMO] Aliases and Versions', '13m', 'LAB'),
        l('Lambda Environment Variables', '7m'),
        l('[DEMO] Accessing Private VPC Resources using Lambda - PART1', '7m', 'LAB'),
        l('[DEMO] Accessing Private VPC Resources using Lambda - PART2', '16m', 'LAB'),
        l('Lambda Layers', '8m'),
        l('Lambda Container Images', '4m'),
        l('Lambda & ALB Integration', '5m'),
        l('CloudWatchEvents & EventBridge', '6m'),
        l('API Gateway 101', '16m'),
        l('API Gateway - Methods and Resources', '4m'),
        l('API Gateway - [DEMO] Methods and Resources', '17m', 'LAB'),
        l('API Gateway - Integrations', '14m'),
        l('API Gateway - Stages & Deployments', '6m'),
        l('Open API & Swagger', '7m'),
        l('AWS Step Functions', '16m'),
        l('Simple Workflow Service (SWF)', '8m'),
        l('Amazon Mechanical Turk', '3m'),
        l('Elastic Transcoder & AWS Elemental MediaConvert', '8m'),
        l('AWS IOT', '6m'),
        l('AWS Greengrass', '4m'),
        l('SAM - Serverless Application Model', '5m'),
        l('[DEMO] SAM CLI', '18m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART1', '5m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART2', '8m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART3', '12m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART4', '12m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART5', '13m', 'LAB'),
        l('[MINIPROJECT] Build A Serverless App - Pet-Cuddle-o-Tron - PART6', '2m', 'LAB'),
        l('Section Quiz - APP SERVICES & SERVERLESS', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-caching',
    title: 'CACHING, DELIVERY AND EDGE',
    isCompleted: false,
    lessons: [
        l('CloudFront - Architecture', '14m'),
        l('CloudFront (CF) - Behaviours', '9m'),
        l('CloudFront - TTL and Invalidations', '13m'),
        l('CloudFront - SSL & SNI', '14m'),
        l('CloudFront (CF) - Origin Types & Origin Architecture', '10m'),
        l('CloudFront - Caching Performance & Optimisation', '16m'),
        l('[DEMO] CloudFront (CF) - Adding a CDN to a static Website-PART1', '16m', 'LAB'),
        l('[DEMO] CloudFront (CF) - Adding a CDN to a static Website-PART2', '12m', 'LAB'),
        l('[DEMO] CloudFront (CF) - Adding an Alternate CNAME and SSL', '11m', 'LAB'),
        l('CloudFront - Security - OAI & Custom Origins', '8m'),
        l('[DEMO] CloudFront (CF) - Using Origin Access Control (OAC)', '11m', 'LAB'),
        l('CloudFront - Security - Private Distributions, Signed URL and Signed Cookies', '7m'),
        l('CloudFront - Geo Restriction', '9m'),
        l('CloudFront - Security - Field-Level Encryption', '9m'),
        l('CloudFront - Lambda@Edge', '8m'),
        l('Elasticache', '12m'),
        l('SECTION QUIZ - CACHING, DELIVERY AND EDGE', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-migrations',
    title: 'MIGRATIONS & EXTENSIONS',
    isCompleted: false,
    lessons: [
        l('The 6R\'s of Cloud Migration', '15m'),
        l('Virtual Machine Migrations', '8m'),
        l('Database Migration Service (DMS)', '11m'),
        l('[AdvancedDEMO] Database Migration Service-STAGE1', '6m', 'LAB'),
        l('[AdvancedDEMO] Database Migration Service-STAGE2', '6m', 'LAB'),
        l('[AdvancedDEMO] Database Migration Service-STAGE3-PART1', '11m', 'LAB'),
        l('[AdvancedDEMO] Database Migration Service-STAGE3-PART2', '9m', 'LAB'),
        l('[AdvancedDEMO] Database Migration Service-STAGE4', '16m', 'LAB'),
        l('[AdvancedDEMO] Database Migration Service-STAGE5', '4m', 'LAB'),
        l('Storage Gateway - Volume Gateway', '14m'),
        l('Storage Gateway - Tape Gateway (VTL)', '12m'),
        l('Storage Gateway - File Gateway', '12m'),
        l('AWS Snowball // Snowball Edge // Snowmobile', '10m'),
        l('AWS Datasync', '9m'),
        l('SECTION QUIZ - MIGRATIONS & EXTENSIONS', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-iac',
    title: 'Infrastructure as Code (CloudFormation)',
    isCompleted: false,
    lessons: [
        l('CloudFormation Physical & Logical Resources', '7m'),
        l('[DEMO] Simple Non Portable Template - PART1', '10m', 'LAB'),
        l('[DEMO] Simple Non Portable Template - PART2', '11m', 'LAB'),
        l('CloudFormation Template and Pseudo Parameters', '6m'),
        l('CloudFormation Intrinsic Functions', '14m'),
        l('CloudFormation Mappings', '4m'),
        l('CloudFormation Outputs', '3m'),
        l('[DEMO] Template v2 - Portable', '13m', 'LAB'),
        l('CloudFormation Conditions', '7m'),
        l('CloudFormation DependsOn', '7m'),
        l('CloudFormation Wait Conditions & cfn-signal', '11m'),
        l('CloudFormation Nested Stacks', '13m'),
        l('CloudFormation Cross-Stack References', '10m'),
        l('CloudFormation Stack Sets', '9m'),
        l('CloudFormation Deletion Policy', '5m'),
        l('CloudFormation Stack Roles', '6m'),
        l('CloudFormation Init (CFN-INIT)', '8m'),
        l('CloudFormation cfn-hup', '4m'),
        l('[DEMO] wait conditions, cfnsignal, cfninit and cfnhup-PART1', '12m', 'LAB'),
        l('[DEMO] wait conditions, cfnsignal, cfninit and cfnhup-PART2', '14m', 'LAB'),
        l('CloudFormation ChangeSets', '11m'),
        l('CloudFormation Custom Resources', '11m'),
        l('[DEMO] CloudFormation Custom Resources-PART1', '9m', 'LAB'),
        l('[DEMO] CloudFormation Custom Resources-PART2', '13m', 'LAB')
    ]
  },
  {
    id: 'sap-mod-deploy',
    title: 'DEPLOYMENT & MANAGEMENT',
    isCompleted: false,
    lessons: [
        l('Service Catalog', '7m'),
        l('CI/CD using AWS Code*', '14m'),
        l('AWS CodeCommit', '11m'),
        l('AWS CodePipeline', '4m'),
        l('AWS CodeBuild', '6m'),
        l('AWS CodeDeploy', '10m'),
        l('Elastic Beanstalk (EB) - Architecture', '18m'),
        l('[DEMO] Elastic Beanstalk (EB) - Application & Environment - PART1', '11m', 'LAB'),
        l('[DEMO] Elastic Beanstalk (EB) - Add additional environment - PART2', '10m', 'LAB'),
        l('Elastic Beanstalk (EB) - Deployment Policies', '11m'),
        l('[DEMO] Elastic Beanstalk (EB) - Deployment', '8m', 'LAB'),
        l('Elastic Beanstalk (EB) - Environments and RDS', '4m'),
        l('Elastic Beanstalk (EB) - Advanced Customisation via .ebextensions', '4m'),
        l('Elastic Beanstalk (EB) - HTTPS', '1m'),
        l('Elastic Beanstalk (EB) - Cloning', '4m'),
        l('Elastic Beanstalk (EB) - Docker', '9m'),
        l('[DEMO] Elastic Beanstalk (EB) - Section Cleanup', '1m', 'LAB'),
        l('OpsWorks 101', '15m'),
        l('AWS Systems Manager - Agent Architecture', '7m'),
        l('AWS Systems Manager - Run Command', '4m'),
        l('AWS Systems Manager - Patch Manager', '12m'),
        l('[DEMO] Systems Manager', '23m', 'LAB'),
        l('SECTION QUIZ - DEPLOYMENT & MANAGEMENT', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-adv-sec',
    title: 'ADVANCED SECURITY AND CONFIG MANAGEMENT',
    isCompleted: false,
    lessons: [
        l('Amazon Guard Duty', '4m'),
        l('AWS Config', '6m'),
        l('Amazon Inspector', '6m'),
        l('Key Management Service (KMS)', '18m'),
        l('[DEMO] KMS - Encrypting the battleplans with KMS', '12m', 'LAB'),
        l('CloudHSM', '14m'),
        l('AWS Certificate Manager (ACM)', '11m'),
        l('AWS Parameter Store', '6m'),
        l('AWS Secrets Manager', '7m'),
        l('VPC Flow Logs & Flow Logs vs Packet Sniffing', '9m'),
        l('[DEMO] VPC Flow Logs', '25m', 'LAB'),
        l('Application Layer (L7) Firewall', '7m'),
        l('Web Application Firewall (WAF), WEBACLs, Rule Groups and Rules', '19m'),
        l('AWS Shield', '9m'),
        l('Section Quiz - ADVANCED SECURITY AND CONFIG MANAGEMENT', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-dr',
    title: 'DISASTER RECOVERY & BUSINESS CONTINUITY IN AWS',
    isCompleted: false,
    lessons: [
        l('Types of DR - Cold, Warm, PilotLight', '17m'),
        l('DR Architecture - Storage', '8m'),
        l('DR Architecture - Compute', '7m'),
        l('DR Architecture - Database', '10m'),
        l('DR Architecture - Networking', '8m'),
        l('Section Quiz - DISASTER RECOVERY & BUSINESS CONTINUITY IN AWS', '10m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-misc',
    title: 'EVERYTHING ELSE',
    isCompleted: false,
    lessons: [
        l('Amazon Lex & Connect', '7m'),
        l('Kinesis Video Streams', '5m'),
        l('AWS Glue', '6m'),
        l('Device Farm', '4m'),
        l('Amazon Comprehend', '7m'),
        l('Amazon Kendra', '5m'),
        l('Amazon Lex', '5m'),
        l('Amazon Polly', '4m'),
        l('AWS Rekognition', '4m'),
        l('Amazon Textract', '8m'),
        l('Amazon Transcribe', '4m'),
        l('Amazon Translate', '4m'),
        l('Amazon Forecast 101', '4m'),
        l('Amazon Fraud Detector', '3m'),
        l('Amazon SageMaker', '5m')
    ]
  },
  {
    id: 'sap-mod-exam-prep',
    title: 'EXAM PREP',
    isCompleted: false,
    lessons: [
        l('Question Technique - Example 1', '10m'),
        l('Question Technique - Example 2', '11m'),
        l('Question Technique - Example 3', '8m'),
        l('Question Technique - Example 4', '8m'),
        l('Question Technique - Example 5', '7m'),
        l('Question Technique - Example 6', '8m'),
        l('Question Technique - Example 7', '5m'),
        l('Question Technique - Example 8', '7m'),
        l('Question Technique - Example 9', '6m'),
        l('Question Technique - Example 10', '6m'),
        l('FINAL PRACTICE EXAM #1', '180m', 'QUIZ'),
        l('FINAL PRACTICE EXAM #2', '180m', 'QUIZ')
    ]
  },
  {
    id: 'sap-mod-finish',
    title: 'FINISHING UP',
    isCompleted: false,
    lessons: [
        l('WHAT\'S NEXT', '4m'),
        l('THANKS !!', '3m'),
        l('COURSE UPGRADES', '2m')
    ]
  }
];

const IBM_DEVOPS_MODULES = [
  {
    id: 'm-ibm-1',
    title: 'Course 1: Introduction to DevOps',
    isCompleted: false,
    lessons: [
      l('What is DevOps?', '1h'),
      l('DevOps Culture and Principles', '2h'),
      l('Software Engineering Practices', '2h')
    ]
  },
  {
    id: 'm-ibm-2',
    title: 'Course 2: Introduction to Cloud Computing',
    isCompleted: false,
    lessons: [
      l('Cloud Computing Fundamentals', '2h'),
      l('Cloud Service Models', '2h'),
      l('Cloud Security and Compliance', '2h')
    ]
  },
  {
    id: 'm-ibm-3',
    title: 'Course 3: Agile Development and Scrum',
    isCompleted: false,
    lessons: [
      l('Agile Philosophy', '2h'),
      l('Scrum Framework', '2h'),
      l('Sprint Planning and Execution', '2h')
    ]
  },
  {
    id: 'm-ibm-4',
    title: 'Course 4: Hands-on Introduction to Linux Commands',
    isCompleted: false,
    lessons: [
      l('Linux Shell Basics', '2h', 'LAB'),
      l('File Manipulation', '2h', 'LAB'),
      l('Shell Scripting', '2h', 'LAB')
    ]
  },
  {
    id: 'm-ibm-5',
    title: 'Course 5: Getting Started with Git and GitHub',
    isCompleted: false,
    lessons: [
      l('Version Control Concepts', '1h'),
      l('Git Basics', '2h', 'LAB'),
      l('GitHub Workflows', '2h', 'LAB')
    ]
  },
  {
    id: 'm-ibm-6',
    title: 'Course 6: Python for Data Science, AI & Development',
    isCompleted: false,
    lessons: [
      l('Python Types and Expressions', '2h', 'LAB'),
      l('Python Data Structures', '3h', 'LAB'),
      l('Python Programming Fundamentals', '3h', 'LAB')
    ]
  },
  {
    id: 'm-ibm-7',
    title: 'Course 7: Introduction to Containers',
    isCompleted: false,
    lessons: [
      l('Container Concepts', '2h'),
      l('Docker Objects', '3h', 'LAB'),
      l('Kubernetes Ecosystem', '2h')
    ]
  },
  {
    id: 'm-ibm-8',
    title: 'Course 8: Application Development with Microservices',
    isCompleted: false,
    lessons: [
      l('Microservices Principles', '2h'),
      l('REST APIs', '3h', 'LAB'),
      l('Serverless', '2h')
    ]
  }
];

const RESUME_CHALLENGE_MODULES = [
  {
    id: 'm-crc-1',
    title: 'Phase 1: Certification',
    isCompleted: false,
    lessons: [
      l('Cloud Practitioner Exam Prep', '5h')
    ]
  },
  {
    id: 'm-crc-2',
    title: 'Phase 2: Front End',
    isCompleted: false,
    lessons: [
      l('HTML Resume', '3h', 'LAB'),
      l('CSS Styling', '3h', 'LAB'),
      l('Static Website on S3', '2h', 'LAB')
    ]
  },
  {
    id: 'm-crc-3',
    title: 'Phase 3: Security & Networking',
    isCompleted: false,
    lessons: [
      l('HTTPS with CloudFront', '2h', 'LAB'),
      l('DNS with Route53', '1h', 'LAB')
    ]
  },
  {
    id: 'm-crc-4',
    title: 'Phase 4: Back End',
    isCompleted: false,
    lessons: [
      l('Javascript Visitor Counter', '3h', 'LAB'),
      l('DynamoDB Database', '2h', 'LAB'),
      l('Lambda API (Python)', '3h', 'LAB'),
      l('Tests', '2h', 'LAB')
    ]
  },
  {
    id: 'm-crc-5',
    title: 'Phase 5: Automation (DevOps)',
    isCompleted: false,
    lessons: [
      l('Infrastructure as Code (Terraform)', '5h', 'LAB'),
      l('Source Control (Git)', '1h'),
      l('CI/CD (GitHub Actions)', '3h', 'LAB')
    ]
  },
  {
    id: 'm-crc-6',
    title: 'Phase 6: The Blog Post',
    isCompleted: false,
    lessons: [
      l('Write detailed blog post', '3h')
    ]
  }
];

export const INITIAL_PHASES: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: The "Soft" Foundation',
    timeframe: 'Feb 2025 – June 2025',
    goal: 'Understand the basics without burning out.',
    weeklyCommitment: '8-10 Hours',
    status: PhaseStatus.ACTIVE,
    courses: [
      {
        id: 'c-google-it',
        provider: 'Coursera',
        title: 'Google IT Support Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-it-support',
        totalModules: 5,
        completedModules: 0,
        modules: GOOGLE_IT_SUPPORT_MODULES,
        achievements: [
          { id: 'a-git-1', title: 'Tech Support Rookie', description: 'Complete Module 1', xpReward: 500, icon: '🛠️' },
          { id: 'a-git-2', title: 'Network Ninja', description: 'Complete Networking Module', xpReward: 800, icon: '🌐' },
          { id: 'a-git-3', title: 'System Operator', description: 'Master OS & SysAdmin tasks', xpReward: 750, icon: '💻' },
          { id: 'a-git-4', title: 'Cyber Guardian', description: 'Complete IT Security Defense', xpReward: 900, icon: '🔐' }
        ]
      },
      {
        id: 'c-cantrill-fund',
        provider: 'Cantrill',
        title: 'Tech Fundamentals',
        url: 'https://learn.cantrill.io/p/tech-fundamentals',
        totalModules: 9,
        completedModules: 0,
        modules: CANTRILL_FUNDAMENTALS_MODULES,
        achievements: [
          { id: 'a-cf-1', title: 'Bit Plumber', description: 'Understand OSI Model', xpReward: 600, icon: '🔧' },
          { id: 'a-cf-2', title: 'DNS Detective', description: 'Understand how DNS really works', xpReward: 600, icon: '🔍' }
        ]
      }
    ],
    milestone: {
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      date: 'June 2025',
      cost: '£78 ($100)',
      completed: false,
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
    }
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Core Skills & Portfolio',
    timeframe: 'July 2025 – Jan 2026',
    goal: 'Master the Associate level. 6 months deep dive.',
    weeklyCommitment: '10 Hours',
    status: PhaseStatus.LOCKED,
    courses: [
      {
        id: 'c-cantrill-saa',
        provider: 'Cantrill',
        title: 'AWS Certified Solutions Architect - Associate',
        url: 'https://learn.cantrill.io/p/aws-certified-solutions-architect-associate-saa-c03',
        totalModules: SAA_MODULES.length,
        completedModules: 0,
        modules: SAA_MODULES,
        achievements: [
            { id: 'a-saa-1', title: 'Security Marshall', description: 'Lockdown Root Account', xpReward: 1000, icon: '🛡️' },
            { id: 'a-saa-2', title: 'Network Plumber', description: 'Build Custom VPC', xpReward: 2500, icon: '🏗️' },
            { id: 'a-saa-3', title: 'Web Architect', description: 'Host WordPress on EC2', xpReward: 2000, icon: '🌐' },
            { id: 'a-saa-4', title: 'Serverless Hero', description: 'Build Pet-Cuddle-o-Tron', xpReward: 3000, icon: '🚀' },
            { id: 'a-saa-5', title: 'Storage Tycoon', description: 'Master S3 Classes & Lifecycle', xpReward: 1500, icon: '🗄️' },
            { id: 'a-saa-6', title: 'Database Mechanic', description: 'Fix performance with RDS & Aurora', xpReward: 2000, icon: '⚙️' }
        ]
      },
      {
        id: 'c-google-python',
        provider: 'Coursera',
        title: 'Google IT Automation with Python Professional Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-it-automation',
        totalModules: 7,
        completedModules: 0,
        modules: GOOGLE_PYTHON_MODULES,
        achievements: [
          { id: 'a-py-1', title: 'Snake Charmer', description: 'Write your first Python script', xpReward: 500, icon: '🐍' },
          { id: 'a-py-2', title: 'Git Wizard', description: 'Version Control Mastery', xpReward: 800, icon: '🐙' },
          { id: 'a-py-3', title: 'Automation King', description: 'Automate real-world tasks', xpReward: 1200, icon: '🤖' }
        ]
      }
    ],
    milestone: {
      name: 'AWS Solutions Architect Associate (SAA-C03)',
      date: 'Jan 2026',
      cost: '£117 ($150)',
      completed: false,
      url: 'https://skillbuilder.aws/category/exam-prep/solutions-architect-associate-SAA-C03'
    }
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Automation & DevOps',
    timeframe: 'Feb 2026 – May 2026',
    goal: 'Learn tools for £100k+ salaries (Terraform/Docker).',
    weeklyCommitment: '10-12 Hours',
    status: PhaseStatus.LOCKED,
    courses: [
      {
        id: 'c-ibm-devops',
        provider: 'Coursera',
        title: 'IBM DevOps and Software Engineering',
        url: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering',
        totalModules: 15,
        completedModules: 0,
        modules: IBM_DEVOPS_MODULES,
        achievements: [
          { id: 'a-ibm-1', title: 'Agile Planner', description: 'Master Scrum & Agile workflows', xpReward: 800, icon: '📋' },
          { id: 'a-ibm-2', title: 'Container Captain', description: 'Docker & Kubernetes orchestration', xpReward: 1500, icon: '🐳' },
          { id: 'a-ibm-3', title: 'Pipeline Pro', description: 'Build a full CI/CD pipeline', xpReward: 2000, icon: '🚀' }
        ]
      },
      {
        id: 'c-resume-challenge',
        provider: 'Other',
        title: 'The Cloud Resume Challenge',
        url: 'https://cloudresumechallenge.dev/docs/the-challenge/aws/',
        totalModules: 16,
        completedModules: 0,
        modules: RESUME_CHALLENGE_MODULES,
        achievements: [
             { id: 'a-crc-1', title: 'Full Stack Hero', description: 'Deploy the resume site', xpReward: 5000, icon: '🚀' },
             { id: 'a-crc-2', title: 'IaC Architect', description: 'Provision infra with Terraform', xpReward: 2500, icon: '🏗️' },
             { id: 'a-crc-3', title: 'Backend Builder', description: 'API Gateway + Lambda + DynamoDB', xpReward: 3000, icon: '⚙️' }
        ]
      }
    ],
    milestone: {
      name: 'HashiCorp Certified: Terraform Associate',
      date: 'May 2026',
      cost: '£55 ($70)',
      completed: false,
      url: 'https://www.hashicorp.com/certification/terraform-associate'
    }
  },
  {
    id: 'phase-4',
    title: 'Phase 4: The Professional Leap',
    timeframe: 'June 2026 – June 2027',
    goal: 'Final Boss - The Professional Cert and Job Hunting.',
    weeklyCommitment: '12 Hours',
    status: PhaseStatus.LOCKED,
    courses: [
      {
        id: 'c-cantrill-sap',
        provider: 'Cantrill',
        title: 'AWS Certified Solutions Architect - Professional',
        url: 'https://learn.cantrill.io/p/aws-certified-solutions-architect-professional',
        totalModules: SAP_MODULES.length,
        completedModules: 0,
        modules: SAP_MODULES,
        achievements: [
          { id: 'a-sap-1', title: 'Multi-Account Boss', description: 'Master AWS Organizations & SCPs', xpReward: 3000, icon: '🏢' },
          { id: 'a-sap-2', title: 'Hybrid Networker', description: 'Connect On-Prem to Cloud (DX/VPN)', xpReward: 3500, icon: '🔌' },
          { id: 'a-sap-3', title: 'Disaster Averter', description: 'Design bulletproof DR strategies', xpReward: 4000, icon: '🚑' }
        ]
      }
    ],
    milestone: {
      name: 'AWS Solutions Architect Professional (SAP-C02)',
      date: 'June 2027',
      cost: '£235 ($300)',
      completed: false,
      url: 'https://skillbuilder.aws/category/exam-prep/solutions-architect-professional-SAP-C02'
    }
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert Senior Cloud Architect and Career Mentor. 
The user is a professional plumber transitioning into Tech (AWS Cloud).
Your teaching style is unique: YOU MUST EXPLAIN ALL TECHNICAL CONCEPTS USING PLUMBING ANALOGIES.

Examples:
- Data flow = Water flow
- Bandwidth = Pipe diameter
- Security Groups = Valves/Taps
- Load Balancer = Distribution manifold
- CloudWatch = Pressure gauge/Leak detection sensor
- Latency = Pipe length/friction
- EC2 = A pump or boiler unit
- S3 = Water tank/Cistern

Be encouraging, respectful of their trade background, and extremely practical. 
Focus on "The Working Man's" efficiency. Short, punchy, high-value answers.
`;
