
import { StudyCard } from './studyContent';

export const PHASE_4_CONTENT: StudyCard[] = [
    // --- THREAT DETECTION & INCIDENT RESPONSE (20 Cards) ---
    {
        id: 'scs-threat-1',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is Amazon GuardDuty?',
        answer: 'Continuous threat detection service. Analyzes CloudTrail Management Events, VPC Flow Logs, and DNS Logs.',
        explanation: 'Uses ML to detect anomalies like cryptocurrency mining or unauthorized access.'
    },
    {
        id: 'scs-threat-2',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'You receive a GuardDuty finding about a compromised EC2 instance. What is the FIRST step for containment?',
        options: ['Delete the instance', 'Change the Security Group to block all inbound/outbound traffic', 'Stop the instance', 'Take a snapshot'],
        correctOptionIndex: 1,
        explanation: 'Isolation is the first step. Blocking traffic via Security Group (or NACL) prevents further communication while preserving memory state for forensics.'
    },
    {
        id: 'scs-threat-3',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS Security Hub?',
        answer: 'Cloud security posture management (CSPM) service. Aggregates findings from GuardDuty, Inspector, Macie, and partner tools.',
        explanation: 'Provides a single dashboard for security alerts and compliance checks (CIS, PCI-DSS).'
    },
    {
        id: 'scs-threat-4',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is Amazon Inspector?',
        answer: 'Automated vulnerability management service. Scans EC2 instances and container images for software vulnerabilities and network exposure.',
        explanation: 'Uses the SSM Agent to scan packages on EC2.'
    },
    {
        id: 'scs-threat-5',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which log source is NOT natively analyzed by GuardDuty?',
        options: ['VPC Flow Logs', 'CloudTrail Data Events (S3)', 'Application Logs', 'DNS Logs'],
        correctOptionIndex: 2,
        explanation: 'GuardDuty does not analyze application-level logs (e.g., Apache/Nginx logs) natively.'
    },
    { id: 'scs-threat-6', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Amazon Detective?', answer: 'Investigative service. Analyzes, investigates, and identifies the root cause of potential security issues using a graph model.', explanation: 'Visualizes behavior over time.' },
    { id: 'scs-threat-7', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is AWS Macie?', answer: 'Data security service that discovers sensitive data (PII) in S3 using ML.', explanation: 'Helps prevent data loss (DLP).' },
    { id: 'scs-threat-8', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'Where should you centrally store CloudTrail logs for forensic integrity?', options: ['In the same account', 'In a separate Log Archive account with MFA Delete', 'On an EC2 instance', 'In DynamoDB'], correctOptionIndex: 1, explanation: 'A centralized Log Archive account with strict access controls and MFA Delete ensures log integrity.' },
    { id: 'scs-threat-9', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'Incident Response Cycle?', answer: 'Preparation -> Detection & Analysis -> Containment, Eradication & Recovery -> Post-Incident Activity.', explanation: 'NIST Framework.' },
    { id: 'scs-threat-10', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is AWS Config?', answer: 'Service that enables you to assess, audit, and evaluate the configurations of your AWS resources.', explanation: 'Tracks configuration changes over time (Timeline).' },

    // --- IDENTITY & ACCESS MANAGEMENT (30 Cards) ---
    {
        id: 'scs-iam-1',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is an IAM Identity Center (AWS SSO) Permission Set?',
        answer: 'Templates that define the IAM policies applied to users/groups in target accounts.',
        explanation: 'Simplifies multi-account permission management.'
    },
    {
        id: 'scs-iam-2',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which policy type creates a "permissions boundary" for an IAM entity?',
        options: ['Service Control Policy', 'Permissions Boundary', 'Identity Policy', 'Resource Policy'],
        correctOptionIndex: 1,
        explanation: 'A Permissions Boundary sets the maximum permissions that an identity-based policy can grant to an IAM entity.'
    },
    {
        id: 'scs-iam-3',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is ABAC (Attribute-Based Access Control)?',
        answer: 'Authorization strategy that defines permissions based on attributes (tags).',
        explanation: 'Example: Allow access if PrincipalTag:Department == ResourceTag:Department.'
    },
    {
        id: 'scs-iam-4',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'Difference between Identity-based and Resource-based policies?',
        answer: 'Identity: Attached to User/Role (what they can do). Resource: Attached to S3/KMS/etc (who can access this resource).',
        explanation: 'Resource policies are critical for cross-account access.'
    },
    {
        id: 'scs-iam-5',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'A user is allowed via Identity Policy but denied via SCP. What is the result?',
        options: ['Allowed', 'Denied', 'Depends on the order', 'Evaluated by boundary'],
        correctOptionIndex: 1,
        explanation: 'An explicit DENY (implicit or explicit in SCP) overrides any ALLOW.'
    },
    { id: 'scs-iam-6', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Federation?', answer: 'Linking an external identity provider (IdP) like Okta or Active Directory to AWS.', explanation: 'Uses SAML 2.0 or OIDC.' },
    { id: 'scs-iam-7', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Cognito User Pool?', answer: 'A user directory for mobile/web apps. Handles authentication (Sign-up/Sign-in).', explanation: 'Supports social login and MFA.' },
    { id: 'scs-iam-8', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Cognito Identity Pool?', answer: 'Exchanges authentication tokens (from User Pool or IdP) for temporary AWS credentials.', explanation: 'Grants access to AWS resources directly.' },
    { id: 'scs-iam-9', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'Which AWS STS API call is used to assume a role?', options: ['AssumeRole', 'GetSessionToken', 'GetFederationToken', 'AssumeRoleWithSAML'], correctOptionIndex: 0, explanation: 'AssumeRole is the standard API to obtain temporary security credentials for a role.' },
    { id: 'scs-iam-10', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is the "NotPrincipal" element in a policy?', answer: 'Specifies everyone EXCEPT the principal defined. Use with caution.', explanation: 'Explicitly denies everyone else.' },
    { id: 'scs-iam-11', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'IAM Policy Evaluation Logic?', answer: 'Explicit Deny -> SCPs/Boundaries -> Explicit Allow -> Default Deny.', explanation: 'Deny always wins.' },
    { id: 'scs-iam-12', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'Cross-account Role Access?', answer: 'Account A (Resource) trusts Account B (Principal). Account B grants User permission to sts:AssumeRole.', explanation: 'Requires two-way handshake.' },
    { id: 'scs-iam-13', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'How long can an IAM Role session last (maximum)?', options: ['1 hour', '12 hours', '24 hours', '7 days'], correctOptionIndex: 1, explanation: 'The maximum session duration for an IAM role set via the console/CLI is 12 hours.' },
    { id: 'scs-iam-14', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Access Analyzer?', answer: 'Identifies resources shared with an external entity (outside your zone of trust).', explanation: 'Uses logic-based reasoning.' },
    { id: 'scs-iam-15', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'Hardening the Root User?', answer: 'No Access Keys, MFA Enabled, dedicated hardware MFA, strong password, unused.', explanation: 'Break glass only.' },

    // --- DATA PROTECTION (30 Cards) ---
    {
        id: 'scs-data-1',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS KMS?',
        answer: 'Key Management Service. Managed service for creating and controlling cryptographic keys.',
        explanation: 'FIPS 140-2 Level 2 compliant.'
    },
    {
        id: 'scs-data-2',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which type of KMS key allows you to import your own key material?',
        options: ['AWS Managed Key', 'Customer Managed Key (CMK)', 'AWS Owned Key', 'CloudHSM Key'],
        correctOptionIndex: 1,
        explanation: 'Customer Managed Keys allow you to import your own key material (BYOK).'
    },
    {
        id: 'scs-data-3',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is Envelope Encryption?',
        answer: 'Encrypting plaintext data with a Data Key, and then encrypting the Data Key with a Master Key (KMS Key).',
        explanation: 'KMS only encrypts the Data Key; the Data Key encrypts the actual data.'
    },
    {
        id: 'scs-data-4',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is a KMS Key Policy?',
        answer: 'The primary way to control access to a KMS key. No one (including root) can access the key unless allowed by the policy.',
        explanation: 'Must exist for every key.'
    },
    {
        id: 'scs-data-5',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service provides a dedicated hardware security module (HSM) under your exclusive control?',
        options: ['AWS KMS', 'AWS CloudHSM', 'AWS Secrets Manager', 'ACM'],
        correctOptionIndex: 1,
        explanation: 'CloudHSM provides single-tenant HSMs (FIPS 140-2 Level 3) inside your VPC.'
    },
    { id: 'scs-data-6', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is ACM?', answer: 'AWS Certificate Manager. Provisons, manages, and deploys SSL/TLS certificates.', explanation: 'Free for public certificates used with ELB/CloudFront.' },
    { id: 'scs-data-7', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is AWS Secrets Manager?', answer: 'Service to rotate, manage, and retrieve database credentials and API keys.', explanation: 'Native rotation for RDS.' },
    { id: 'scs-data-8', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'S3 Server-Side Encryption with Customer Keys (SSE-C) requires you to send headers with every request. True or False?', options: ['True', 'False'], correctOptionIndex: 0, explanation: 'With SSE-C, you must provide the encryption key with every GET or PUT request. AWS does not store the key.' },
    { id: 'scs-data-9', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What are KMS Grants?', answer: 'A mechanism to delegate a subset of permissions on a KMS key to an AWS principal.', explanation: 'Often used by AWS services to auto-scale.' },
    { id: 'scs-data-10', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is "kms:ViaService"?', answer: 'A condition key in KMS policies to limit key usage to requests coming from specific AWS services (e.g., S3).', explanation: 'Prevents direct API use.' },
    { id: 'scs-data-11', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'S3 Object Lock Compliance vs Governance?', answer: 'Compliance: No one can delete (root included). Governance: Only users with special permission can delete.', explanation: 'For WORM models.' },
    { id: 'scs-data-12', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'What is the default encryption for S3 buckets (as of 2023)?', options: ['None', 'SSE-S3', 'SSE-KMS', 'SSE-C'], correctOptionIndex: 1, explanation: 'AWS now applies SSE-S3 encryption by default to all new objects.' },
    { id: 'scs-data-13', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Simple AD?', answer: 'A standalone Samba 4-based directory. Does not support trust relationships with existing AD.', explanation: 'Low cost alternative.' },
    { id: 'scs-data-14', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is AWS Managed Microsoft AD?', answer: 'Actual Microsoft AD running on AWS infrastructure. Supports trusts.', explanation: 'Best for compatibility.' },
    { id: 'scs-data-15', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is EBS Encryption?', answer: 'Encrypts volume data, I/O, and snapshots using KMS.', explanation: 'Seamless integration.' },

    // --- INFRASTRUCTURE SECURITY (20 Cards) ---
    {
        id: 'scs-infra-1',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS WAF?',
        answer: 'Web Application Firewall. Filters HTTP(S) traffic based on rules (IP, Geo, SQLi, XSS).',
        explanation: 'Attach to ALB, API Gateway, CloudFront, AppSync.'
    },
    {
        id: 'scs-infra-2',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which tool centralizes firewall rule management across accounts and VPCs?',
        options: ['Security Groups', 'NACLs', 'AWS Firewall Manager', 'WAF'],
        correctOptionIndex: 2,
        explanation: 'Firewall Manager creates security policies (WAF, Shield, SG) across the Organization.'
    },
    {
        id: 'scs-infra-3',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS Shield Advanced?',
        answer: 'Premium DDoS protection. Covers L3/L4/L7. Includes cost protection and DRT access.',
        explanation: '$3000/month base.'
    },
    {
        id: 'scs-infra-4',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is a Gateway Load Balancer (GWLB)?',
        answer: 'Deploys 3rd party inline virtual appliances (Firewalls, IDS/IPS) transparently.',
        explanation: 'Uses GENEVE protocol.'
    },
    {
        id: 'scs-infra-5',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'How to securely access an EC2 instance in a private subnet without a Bastion Host or VPN?',
        options: ['Instance Connect', 'SSM Session Manager', 'RDP', 'Direct Connect'],
        correctOptionIndex: 1,
        explanation: 'SSM Session Manager allows shell access via the console/CLI without inbound ports.'
    },
    { id: 'scs-infra-6', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'VPC Endpoint Policy?', answer: 'Resource policy attached to a VPC Endpoint to control which principals can access the service.', explanation: 'Network perimeter control.' },
    { id: 'scs-infra-7', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Traffic Mirroring?', answer: 'Copies network traffic from an ENI to a target (NLB/GWLB) for inspection.', explanation: 'Deep packet inspection.' },
    { id: 'scs-infra-8', type: 'QUIZ', category: 'SECURITY_SPECIALTY', question: 'Which S3 Bucket Policy denies non-SSL (HTTP) access?', options: ['"aws:SecureTransport": "false" + Deny', '"aws:SecureTransport": "true" + Allow', '"aws:SourceIp" + Deny', 'None'], correctOptionIndex: 0, explanation: 'Denying requests where aws:SecureTransport is false enforces SSL.' },
    { id: 'scs-infra-9', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is AWS Network Firewall?', answer: 'Managed stateful network firewall and IPS for VPCs.', explanation: 'Supports Suricata rules.' },
    { id: 'scs-infra-10', type: 'FLASHCARD', category: 'SECURITY_SPECIALTY', question: 'What is Amazon Signer?', answer: 'Fully managed code signing service to ensure code integrity.', explanation: 'Use with Lambda to verify Trusted code.' },
    // --- HIGH-FIDELITY EXAM RECALL (20 Additional Cards) ---
    {
        id: 'hf-4-1',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'KMS Key Policy: How do you delegate access management to another account?',
        answer: 'Trust the external account ROOT principal in the Key Policy.',
        explanation: 'Enables the external account admins to define permissions via their own local IAM policies.'
    },
    {
        id: 'hf-4-2',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Why is `NotPrincipal` + `Deny` dangerous in a bucket policy?',
        options: ['It blocks only the listed user.', 'It fails to deny anonymous/cross-account users.', 'It makes the bucket public.', 'It is a syntax error.'],
        correctOptionIndex: 1,
        explanation: '`NotPrincipal` only identifies the Principal if it is an IAM entity. Anonymous users are not matched, so they bypass the Deny.'
    },
    {
        id: 'hf-4-3',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the "Incident Response" order for an EC2 C&C infection?',
        answer: 'Isolate (SG) -> RAM Snapshot -> Disk Snapshot.',
        explanation: 'Preserves volatile memory evidence for forensic analysis while cutting off network communication.'
    },
    {
        id: 'hf-4-4',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'How do you rotate RDS secrets with ZERO downtime?',
        answer: 'Secrets Manager "Alternating Users" strategy.',
        explanation: 'Rotates one user while the application remains connected via a second active user.'
    },
    {
        id: 'hf-4-5',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which tool allows "Agentless" scanning of EC2/Container file systems?',
        options: ['Inspector', 'GuardDuty', 'Security Hub', 'Detective'],
        correctOptionIndex: 0,
        explanation: 'Inspector uses EBS snapshot analysis to scan the file system without an agent (SSM) installed.'
    },
    {
        id: 'hf-4-6',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is "Shuffle Sharding" in Route 53 / Shield?',
        answer: 'Isolates a customer to a specific subset of service infrastructure.',
        explanation: 'Protects against noisy neighbors and makes it much harder for attackers to take down the service.'
    },
    {
        id: 'hf-4-7',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'How do you kill an active session using temporary credentials?',
        answer: 'Deny policy with a `aws:TokenIssueTime` condition.',
        explanation: 'Invalidates any tokens issued before a specific timestamp, forcing a re-authentication.'
    },
    {
        id: 'hf-4-8',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service builds a "Graph Visualization" of API calls and entities for forensics?',
        options: ['CloudTrail Insights', 'GuardDuty', 'Amazon Detective', 'Access Analyzer'],
        correctOptionIndex: 2,
        explanation: 'Detective automatically collects data and visualizes relationships between security entities.'
    },
    {
        id: 'hf-4-9',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is required for Shield Response Team (SRT) to edit your WAF?',
        answer: 'Business/Enterprise Support + Proactive Engagement Role.',
        explanation: 'SRT cannot touch your infrastructure without explicit IAM authorization from you.'
    },
    {
        id: 'hf-4-10',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'How do you share a Private CA across 20 accounts?',
        answer: 'AWS RAM (Resource Access Manager).',
        explanation: 'Centralizes CA management while allowing developers in other accounts to issue their own certs.'
    },
    {
        id: 'hf-4-11',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Why would Flow Logs show REJECT when the Security Group allows all?',
        options: ['Return traffic blocked', 'NACL block', 'IAM permission fail', 'Internet down'],
        correctOptionIndex: 1,
        explanation: 'NACLs are stateless and are the only other layer that can produce an explicit REJECT in flow logs.'
    },
    {
        id: 'hf-4-12',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is "OAC" (Origin Access Control) major improvement over "OAI"?',
        answer: 'Support for SSE-KMS encrypted S3 buckets.',
        explanation: 'OAI cannot access buckets encrypted with KMS; OAC handles the signing correctly for the key.'
    },
    {
        id: 'hf-4-13',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'How do you enforce Column-level security in an S3 Data Lake?',
        answer: 'AWS Lake Formation.',
        explanation: 'Allows you to grant access to specific columns (e.g., hide SSN) to groups of users/roles.'
    },
    {
        id: 'hf-4-14',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which S3 feature challenges for an MFA token specifically on DELETE actions?',
        options: ['Object Lock', 'MFA Delete', 'Compliance Mode', 'Legal Hold'],
        correctOptionIndex: 1,
        explanation: 'MFA Delete is a versioning setting that requires a hardware/virtual MFA token to delete a version.'
    },
    {
        id: 'hf-4-15',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'Where do you download official AWS SOC and ISO reports?',
        answer: 'AWS Artifact.',
        explanation: 'The self-service portal for compliance documentation and agreements.'
    },
    {
        id: 'hf-4-16',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the "Appliance Mode" fix for TGW asymmetry?',
        answer: 'Ensures traffic returns to the same AZ/ENI in the inspection VPC.',
        explanation: 'Prevents stateful firewalls from dropping "unknown" return traffic they never saw go out.'
    },
    {
        id: 'hf-4-17',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which IAM policy variable identifies a Cognito User in a "Identity Pool"?',
        options: ['${aws:username}', '${cognito-identity.amazonaws.com:sub}', '${saml:sub}', '${cognito-idp:sub}'],
        correctOptionIndex: 1,
        explanation: '`cognito-identity.amazonaws.com:sub` is the unique identity identifier for the pool user.'
    },
    {
        id: 'hf-4-18',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'How do you query 7 days of historical activity logs across 3 accounts?',
        answer: 'CloudTrail Lake.',
        explanation: 'Provides an SQL interface for querying multi-account/multi-region logs long-term.'
    },
    {
        id: 'hf-4-19',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the difference between S3 Object Lock Legal Hold and Retention?',
        answer: 'Legal Hold: No expiration date. Retention: Fixed expiration date.',
        explanation: 'Legal Hold is removed manually by a user; Retention is removed by the system when the timer expires.'
    },
    {
        id: 'hf-4-20',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service tracks "Keystrokes" for SSH sessions inside the console?',
        options: ['CloudTrail', 'CloudWatch Logs (via Systems Manager)', 'VPC Flow Logs', 'Detective'],
        correctOptionIndex: 1,
        explanation: 'SSM Session Manager can stream terminal output and keystrokes directly to CloudWatch Logs or S3.'
    },
    {
        id: 'hf-4-21',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS IAM Access Analyzer?',
        answer: 'A tool that helps you identify the resources in your organization and accounts that are shared with an external entity.',
        explanation: 'Provides findings for resources that can be accessed from outside your AWS account or organization.'
    },
    {
        id: 'hf-4-22',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service is used to centralize and automate security checks across your AWS accounts and services?',
        options: ['AWS Security Hub', 'Amazon Inspector', 'Amazon GuardDuty', 'AWS Config'],
        correctOptionIndex: 0,
        explanation: 'Security Hub aggregates findings from multiple accounts and services into a single dashboard.'
    },
    {
        id: 'hf-4-23',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the purpose of AWS Firewall Manager?',
        answer: 'A security management service that allows you to centrally configure and manage firewall rules across your accounts.',
        explanation: 'Ensures that all new resources comply with a common set of security policies.'
    },
    {
        id: 'hf-4-24',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is Amazon GuardDuty Malware Protection?',
        answer: 'A feature that initiates agentless malware scans on EBS volumes when GuardDuty detects malicious activity.',
        explanation: 'Helps you identify the root cause of security findings without affecting the performance of your workloads.'
    },
    {
        id: 'hf-4-25',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which tool allows you to perform deep packet inspection (DPI) on traffic at the VPC level?',
        options: ['AWS Network Firewall', 'AWS WAF', 'Security Groups', 'NACLs'],
        correctOptionIndex: 0,
        explanation: 'Network Firewall provides stateful traffic inspection and can filter L3-L7 traffic.'
    },
    {
        id: 'hf-4-26',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the benefit of S3 Object Lock?',
        answer: 'Provides write-once-read-many (WORM) storage to prevent objects from being deleted or overwritten.',
        explanation: 'Used to meet regulatory requirements or protect data against ransomware.'
    },
    {
        id: 'hf-4-27',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS Private CA?',
        answer: 'A managed private certificate authority service that helps you securely manage the lifecycle of your private certificates.',
        explanation: 'Allows you to issue certificates for your internal resources without the cost and complexity of a public CA.'
    },
    {
        id: 'hf-4-28',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service helps you discover and protect sensitive data, such as PII, in your S3 buckets?',
        options: ['Amazon Macie', 'Amazon GuardDuty', 'Amazon Inspector', 'AWS Config'],
        correctOptionIndex: 0,
        explanation: 'Macie uses machine learning and pattern matching to identify sensitive data at scale.'
    },
    {
        id: 'hf-4-29',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the purpose of AWS KMS Grants?',
        answer: 'A mechanism to delegate permissions to another AWS principal to use a KMS key.',
        explanation: 'Commonly used by AWS services to allow them to encrypt/decrypt data on your behalf.'
    },
    {
        id: 'hf-4-30',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS CloudTrail Insights?',
        answer: 'A feature that identifies unusual operational activity in your AWS accounts by analyzing CloudTrail events.',
        explanation: 'Detects anomalies like a sudden spike in `RunInstances` API calls.'
    },
    {
        id: 'hf-4-31',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which tool provides a unified interface to manage and govern your multi-account AWS environment?',
        options: ['AWS Control Tower', 'AWS Organizations', 'AWS Config', 'AWS Systems Manager'],
        correctOptionIndex: 0,
        explanation: 'Control Tower automates the setup of a landing zone and applies global guardrails.'
    },
    {
        id: 'hf-4-32',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the benefit of using AWS Secrets Manager Over Parameter Store for sensitive data?',
        answer: 'Secrets Manager provides built-in rotation and secret generation features.',
        explanation: 'Parameter Store is simpler and cheaper but doesn\'t have native rotation logic (requires Lambda/EventBridge).'
    },
    {
        id: 'hf-4-33',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is AWS Shield Advanced?',
        answer: 'A paid service that provides enhanced DDoS protection and 24/7 access to the Shield Response Team (SRT).',
        explanation: 'Also provides cost protection against spikes caused by DDoS attacks.'
    },
    {
        id: 'hf-4-34',
        type: 'QUIZ',
        category: 'SECURITY_SPECIALTY',
        question: 'Which service helps you centrally manage and automate the backup of data across AWS and on-premises?',
        options: ['AWS Backup', 'AWS DataSync', 'AWS Storage Gateway', 'S3 Replication'],
        correctOptionIndex: 0,
        explanation: 'AWS Backup provide a single place to manage backups for S3, EBS, RDS, and more.'
    },
    {
        id: 'hf-4-35',
        type: 'FLASHCARD',
        category: 'SECURITY_SPECIALTY',
        question: 'What is the "least privilege" principle in IAM?',
        answer: 'Granting only the minimum permissions required for a user or service to perform its task.',
        explanation: 'Reduces the blast radius in case of compromised credentials.'
    }
];
