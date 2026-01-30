
import { ExamDefinition } from './types';

export const PHASE_3_EXAM_3: ExamDefinition = {
    id: 'sap-c02-exam-3',
    title: 'AWS Solutions Architect Professional - Exam 3',
    code: 'SAP-C02',
    description: 'Advanced Security, Governance & Cost Optimization.',
    timeLimitMinutes: 60,
    passingScore: 750,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company has 100 AWS accounts. They want to ensure that all EC2 instances launched in any account are tagged with "CostCenter". If an instance is launched without this tag, it should be terminated immediately.',
            options: ['Use a Tag Policy in AWS Organizations.', 'Use an AWS Config Rule (Required-Tags) with Auto-Remediation (Terminate).', 'Use an SCP to Deny RunInstances if the tag is missing.', 'Use EventBridge to trigger Lambda.'],
            correctAnswer: 2,
            explanation: 'SCP is the best *preventative* control. You can write an SCP that Denies `ec2:RunInstances` unless the Condition `aws:RequestTag/CostCenter` exists. This prevents the resource from ever existing.',
            distractorExplanation: 'Config (Option B) is reactive (terminates after launch). Tag Policies (Option A) audit and prevent non-compliant *values* but don\'t strictly block creation in all cases as effectively/simply as a hard SCP deny.'
        },
        {
            id: 'q2',
            scenario: 'You are calculating the TCO for a migration. You currently have on-prem licenses for Oracle Database with 2 years remaining. You want to bring these licenses to AWS to save costs.',
            options: ['Use RDS License Included.', 'Use EC2 Dedicated Hosts (BYOL).', 'Use RDS Custom.', 'Use Aurora.'],
            correctAnswer: 1,
            explanation: 'To Bring Your Own License (BYOL) for socket/core-based software (like Oracle/SQL Server) and maintain compliance, you often need rights to the physical hardware. EC2 Dedicated Hosts provide this visibility.',
            distractorExplanation: 'RDS License Included pays AWS for the license (double paying). RDS Custom allows OS access but Dedicated Hosts is the Licensing answer.'
        },
        {
            id: 'q3',
            scenario: 'A company wants to centrally manage firewall rules across hundreds of VPCs for their Internet Gateways, NAT Gateways, and ALBs.',
            options: ['AWS Firewall Manager.', 'AWS Shield Advanced.', 'Security Hub.', 'Systems Manager.'],
            correctAnswer: 0,
            explanation: 'AWS Firewall Manager is the tool to govern WAF rules, Security Groups, and Shield Advanced policies across an Organization.',
            distractorExplanation: 'Shield is DDoS. Hub is findings.'
        },
        {
            id: 'q4',
            scenario: 'You need to grant an external auditor access to your logs in S3. The auditor needs to use their own third-party analysis tool which runs on their laptop. They should not create IAM users in your account.',
            options: ['Create a Cross-Account IAM Role with a trust policy for the Auditor\'s AWS Account. They assume the role.', 'Create a Presigned URL for the bucket.', 'Enable S3 Block Public Access.', 'Use Cognito.'],
            correctAnswer: 0,
            explanation: 'If the auditor has an AWS account, Cross-Account Role is best. If they don\'t, you might need IAM Identity Center (SSO) guest access. But standard B2B pattern is Account-to-Account trust.',
            distractorExplanation: 'Presigned URL for entire logs is unmanageable.'
        },
        {
            id: 'q5',
            scenario: 'You have a large fleet of EC2 instances. You want to identify instances that are underutilized and downsize them to save money.',
            options: ['AWS Compute Optimizer.', 'Cost Explorer.', 'Trusted Advisor.', 'Budgets.'],
            correctAnswer: 0,
            explanation: 'Compute Optimizer analyzes CloudWatch metrics (CPU, Memory if agent installed) and uses ML to recommend specific instance type changes.',
            distractorExplanation: 'Cost Explorer shows spend. Trusted Advisor shows simple checks, Accelerator is deeper.'
        },
        {
            id: 'q6',
            scenario: 'You are using Spot Instances for a stateless web application. You want to minimize the chance of interruption.',
            options: ['Use Spot Block.', 'Use Capacity Rebalancing in the Auto Scaling Group.', 'Bid very high.', 'Use Defined Duration.'],
            correctAnswer: 1,
            explanation: 'Capacity Rebalancing monitors the "Rebalance Recommendation" signal (2 mins before interruption warning) and proactively spins up a new instance before the old one dies.',
            distractorExplanation: 'Defined Duration (Spot Block) is deprecated/limited for new users. Bidding high doesn\'t stop interruptions (capacity is rule).'
        },
        {
            id: 'q7',
            scenario: 'A company needs to implement a "Encryption at Rest" policy for all S3 buckets. They want to use a specific CMK (Customer Managed Key) and ensure that no one can upload an unencrypted object.',
            options: ['Bucket Policy Deny s3:PutObject with `s3:x-amz-server-side-encryption` != `aws:kms`.', 'Default Encryption on the Bucket.', 'Both.', 'Client Side Encryption.'],
            correctAnswer: 2,
            explanation: 'The modern way: Set "Default Encryption" on the bucket to the CMK. This auto-encrypts everything. For strict compliance (Double Check), you can also add the Bucket Policy Enforce, but Default Encryption is the primary operational tool.',
            distractorExplanation: 'Just Default encryption is usually enough now.'
        },
        {
            id: 'q8',
            scenario: 'You are using AWS Control Tower. You want to prevent users from creating public S3 buckets in any account.',
            options: ['Enable the "Detect Public S3 Buckets" Guardrail.', 'Enable the "Disallow Public S3 Buckets" Guardrail (Preventative).', 'Use IAM.', 'Use CloudWatch.'],
            correctAnswer: 1,
            explanation: 'Control Tower uses "Guardrails". Preventative Guardrails (SCPs) block the action. Detective Guardrails (Config) report it.',
            distractorExplanation: 'Detect is reactive.'
        },
        {
            id: 'q9',
            scenario: 'A company has a requirement to store data for 7 years. For the first year, it is accessed monthly. After that, it is successfully never technically accessed but must be kept. Retrieval time for archive is 12 hours.',
            options: ['S3 Intelligent-Tiering.', 'S3 Standard-IA to Glacier Deep Archive.', 'S3 One Zone-IA.', 'S3 Standard.'],
            correctAnswer: 1,
            explanation: 'LIfecycle policy: Standard-IA (Monthly access) -> Glacier Deep Archive (Cheapest, 12h retrieval) after 1 year.',
            distractorExplanation: 'Intelligent-Tiering has a monitoring fee that might add up for "Never accessed" archive data compared to Deep Archive raw cost.'
        },
        {
            id: 'q10',
            scenario: 'You need to deploy a PCI-DSS compliant architecture. You need to capture all traffic flows for audit.',
            options: ['VPC Flow Logs.', 'Traffic Mirroring.', 'CloudTrail.', 'WAF.'],
            correctAnswer: 0,
            explanation: 'VPC Flow Logs provides the network trace required for many compliance audits.',
            distractorExplanation: 'Mirroring is for deep packet inspection (IDS/IPS), Flow Logs is for "Who talked to who".'
        },
        {
            id: 'q11',
            scenario: 'You want to deploy an application to multiple regions using CloudFormation. You want to manage the template from a central location.',
            options: ['CloudFormation StackSets.', 'Nested Stacks.', 'Cross-Region Copy.', 'CodePipeline.'],
            correctAnswer: 0,
            explanation: 'StackSets allow you to create, update, or delete stacks across multiple accounts and regions with a single operation.',
            distractorExplanation: 'Nested Stacks are for modularity within one stack.'
        },
        {
            id: 'q12',
            scenario: 'Which service allows you to securely access your EC2 instances without opening port 22 (SSH) or managing proper bastion hosts?',
            options: ['Session Manager (Systems Manager).', 'EC2 Instance Connect.', 'Connecting via Serial Console.', 'VPN.'],
            correctAnswer: 0,
            explanation: 'Session Manager provides secure, auditable, browser-based shell access without opening inbound ports.',
            distractorExplanation: 'Instance Connect still uses SSH port/keys usually.'
        },
        {
            id: 'q13',
            scenario: 'You have a Redshift cluster. queries are running slow. You notice a lot of queries are scanning the entire table.',
            options: ['Define correct Sort Keys and Distribution Keys.', 'Add more nodes.', 'Use Spectrum.', 'Use AQUA.'],
            correctAnswer: 0,
            explanation: 'Optimization 101 for Redshift: Sort Keys (pruning) and Dist Keys (minimize shuffle).',
            distractorExplanation: 'Adding nodes costs money, fix schema first.'
        },
        {
            id: 'q14',
            scenario: 'You need to migrate a MongoDB database to AWS. You want to use a managed service that is compatible.',
            options: ['DocumentDB.', 'DynamoDB.', 'RDS.', 'Neptune.'],
            correctAnswer: 0,
            explanation: 'Amazon DocumentDB is MongoDB-compatible.',
            distractorExplanation: 'DynamoDB is proprietary NoSQL.'
        },
        {
            id: 'q15',
            scenario: 'A company wants to run a hybrid DNS. They want their on-prem Active Directory to resolve AWS names.',
            options: ['Route 53 Resolver Outbound Endpoint.', 'Route 53 Resolver Inbound Endpoint.', 'AD Connector.', 'Simple AD.'],
            correctAnswer: 1,
            explanation: 'To resolve AWS names FROM On-Prem, you go IN to AWS. Inbound Endpoint.',
            distractorExplanation: 'Outbound is AWS -> On-Prem.'
        },
        {
            id: 'q16',
            scenario: 'You need to enforce a policy that all EBS volumes must be encrypted.',
            options: ['Enable "Encryption by Default" for the AWS Region.', 'Use Config Rule.', 'Use IAM Policy.', 'Use SCP.'],
            correctAnswer: 0,
            explanation: 'Account-level "Encryption by Default" setting is the strongest/easiest catch-all.',
            distractorExplanation: 'Config is reactive.'
        },
        {
            id: 'q17',
            scenario: 'You want to maximize networking throughput between two EC2 instances in the same Placement Group.',
            options: ['Enable Enhanced Networking (ENA).', 'Use Jumbo Frames (MTU 9001).', 'Both.', 'Use DPDK.'],
            correctAnswer: 2,
            explanation: 'ENA provides the driver speeds (up to 100G). Jumbo Frames payload efficiency. You need both for max throughput.',
            distractorExplanation: '.'
        },
        {
            id: 'q18',
            scenario: 'You have a legacy application that requires a static IP address. You are migrating it to Fargate.',
            options: ['Use a Network Load Balancer (NLB) with an Elastic IP in front of Fargate.', 'Assign an EIP to the Fargate Task.', 'Use ALB.', 'Use Global Accelerator.'],
            correctAnswer: 0,
            explanation: 'Fargate tasks do not support EIPs directly (in standard mode). The pattern is to put an NLB (which supports Static IPs) in front of the Fargate Service.',
            distractorExplanation: 'ALB IPs change.'
        },
        {
            id: 'q19',
            scenario: 'You want to deliver a specific version of a website to users based on their subscription level (Free vs Paid) stored in a JWT cookie.',
            options: ['CloudFront Functions.', 'Lambda@Edge.', 'WAF.', 'ALB.'],
            correctAnswer: 0,
            explanation: 'CloudFront Functions are lightweight JS that run at the edge (Viewer Request). They are perfect for header/cookie manipulation and cache key normalization. Cheaper/Faster than L@E for simple logic.',
            distractorExplanation: 'L@E is for heavier logic (network calls).'
        },
        {
            id: 'q20',
            scenario: 'A company has data in S3. They want to prevent the data from being deleted for legal hold purposes. No one, not even root, should be able to delete it.',
            options: ['S3 Object Lock in Compliance Mode.', 'S3 Object Lock in Governance Mode.', 'MFA Delete.', 'Bucket Policy.'],
            correctAnswer: 0,
            explanation: 'Compliance Mode prevents deletion by ANYONE (including root) until the retention period expires.',
            distractorExplanation: 'Governance mode allows some users with special permissions to override.'
        }
    ]
};
