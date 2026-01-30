
import { ExamDefinition } from './types';

export const PHASE_4_EXAM_3: ExamDefinition = {
    id: 'scs-c02-exam-3',
    title: 'AWS Security Specialty - Exam 3',
    code: 'SCS-C02',
    description: 'Infrastructure Security, Edge Protection & Network Firewalls.',
    timeLimitMinutes: 60,
    passingScore: 750,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'You need to inspect all outbound traffic from your VPCs to the internet for domain filtering (preventing access to malware sites). You have 100 VPCs connected via Transit Gateway.',
            options: ['Deploy AWS Network Firewall in a dedicated Inspection VPC (Centralized Egress).', 'Deploy Squid Proxy in every VPC.', 'Use Route 53 Resolver DNS Firewall.', 'Use Security Groups.'],
            correctAnswer: 0,
            explanation: 'AWS Network Firewall is the centralized "Deep Packet Inspection / Domain Filtering" tool. Using a "Centralized Egress" VPC attached to TGW allows you to inspect traffic from all 100 VPCs in one place.',
            distractorExplanation: 'DNS Firewall (Option C) filters name resolution but doesn\'t inspect the actual traffic/IPs if user bypasses DNS. Network Firewall is stronger. Squid (Option B) is unmanageable.'
        },
        {
            id: 'q2',
            scenario: 'You want to protect an ALB from SQL Injection attacks.',
            options: ['AWS WAF with SQLi rule group.', 'Security Groups.', 'NACL.', 'Shield.'],
            correctAnswer: 0,
            explanation: 'WAF is Layer 7. SQLi is Layer 7.',
            distractorExplanation: 'Security Groups are Layer 4 (Ports). Shield is Volumetric.'
        },
        {
            id: 'q3',
            scenario: 'Your application is under a DDoS attack (UDP Reflection).',
            options: ['AWS Shield Standard (Auto-mitigates).', 'WAF.', 'Inspector.', 'Macie.'],
            correctAnswer: 0,
            explanation: 'Shield Standard (free) covers Layer 3/4 attacks like UDP Floods/Reflection for all customers.',
            distractorExplanation: 'WAF is L7.'
        },
        {
            id: 'q4',
            scenario: 'You need to securely manage Certificates for your Load Balancers. The keys should not be exportable.',
            options: ['ACM (Amazon Certificate Manager).', 'IAM Server Certificates.', 'OpenSSL on EC2.', 'LetsEncrypt.'],
            correctAnswer: 0,
            explanation: 'ACM manages SSL/TLS certs. The Private Keys are managed by AWS and you cannot export them (for public certs), making them secure.',
            distractorExplanation: 'IAM Certs are legacy.'
        },
        {
            id: 'q5',
            scenario: 'You have an EC2 instance in a public subnet. It has a Security Group allowing SSH (22) from 0.0.0.0/0. however, you cannot connect. You check the NACL of the subnet.',
            options: ['The NACL must allow Inbound on 22 AND Outbound on Ephemeral Ports (1024-65535).', 'The NACL must allow Inbound on 22.', 'NACLs are stateful, so you only need inbound.', 'Use Systems Manager.'],
            correctAnswer: 0,
            explanation: 'NACLs are STATELESS. Return traffic is NOT automatically allowed. You must explicitly allow the return traffic on Ephemeral Ports.',
            distractorExplanation: 'Security Groups are stateful. NACLs are stateless.'
        },
        {
            id: 'q6',
            scenario: 'Which VPN option supports BGP for dynamic routing?',
            options: ['Site-to-Site VPN.', 'Client VPN.', 'SSL VPN.', 'OpenVPN.'],
            correctAnswer: 0,
            explanation: 'AWS Site-to-Site VPN supports dynamic routing via BGP.',
            distractorExplanation: 'Client VPN is for users.'
        },
        {
            id: 'q7',
            scenario: 'You want to ensure that traffic between two EC2 instances in different VPCs (Peered) is encrypted.',
            options: ['It is encrypted by the underlying physical layer (Nitro/AWS Backbone) automatically for modern instances.', 'You must use IPsec.', 'You must use TLS in the app.', 'Traffic is cleartext.'],
            correctAnswer: 0,
            explanation: 'Cross-VPC peering traffic (and TGW) on the AWS global network is automatically encrypted at the physical layer for most modern instance types.',
            distractorExplanation: 'App level TLS is good practice (Defense in Depth) but the *Platform* provides encryption now.'
        },
        {
            id: 'q8',
            scenario: 'You need to block access to your S3 bucket from a specific suspicious IP address.',
            options: ['Use a Bucket Policy with `Deny` & Condition `aws:SourceIp`.', 'Use Security Groups.', 'Use NACL.', 'Use WAF.'],
            correctAnswer: 0,
            explanation: 'S3 buckets don\'t have Security Groups. You use Bucket Policy or Block Public Access.',
            distractorExplanation: 'WAF attaches to CloudFront/ALB, not S3 directly (unless via CloudFront).'
        },
        {
            id: 'q9',
            scenario: 'You are using CloudFront. You want to ensure that users cannot bypass CloudFront and access the S3 origin directly.',
            options: ['Origin Access Control (OAC).', 'Security Group.', 'NACL.', 'WAF.'],
            correctAnswer: 0,
            explanation: 'OAC (successor to OAI) allows you to lock the bucket so only CloudFront can read it.',
            distractorExplanation: 'Security Groups don\'t work on S3.'
        },
        {
            id: 'q10',
            scenario: 'You want to privately acccess a SaaS application endpoint provided by a vendor via PrivateLink. What do you create in your VPC?',
            options: ['VPC Endpoint (Interface).', 'VPC Endpoint (Gateway).', 'NAT Gateway.', 'Transit Gateway.'],
            correctAnswer: 0,
            explanation: 'Interface Endpoints are used for PrivateLink services.',
            distractorExplanation: 'Gateway Endpoints are for S3/DynamoDB only.'
        },
        {
            id: 'q11',
            scenario: 'A company needs to analyze traffic entering their VPC. They want to use a 3rd party IDS appliance.',
            options: ['Gateway Load Balancer (GWLB).', 'ALB.', 'NLB.', 'Classic LB.'],
            correctAnswer: 0,
            explanation: 'GWLB is designed for inserting 3rd party virtual appliances (Firewalls/IDS) into the traffic path transparently.',
            distractorExplanation: 'ALB/NLB proxy traffic, GWLB tunnels it (Geneve).'
        },
        {
            id: 'q12',
            scenario: 'You have strict requirements for SSH key management. You cannot use shared keys. Users must use their own keys, and the keys must be rotated daily.',
            options: ['EC2 Instance Connect.', 'Systems Manager Session Manager (No keys).', 'Hardcoded keys.', 'IAM Keys.'],
            correctAnswer: 0,
            explanation: 'EC2 Instance Connect pushes a temporary public key to the instance metadata for 60 seconds allowed the user to connect. It supports IAM control and no long-term keys.',
            distractorExplanation: 'Session Manager is also good (No keys at all), but EC2 Instance Connect satisfies the "Users must use their own keys (generated daily/on-demand)" constraint of standard SSH workflows.'
        },
        {
            id: 'q13',
            scenario: 'Which service protects against "Slow Loris" attacks?',
            options: ['AWS WAF.', 'Shield.', 'Security Groups.', 'NACL.'],
            correctAnswer: 0,
            explanation: 'Slow Loris keeps connections open. ALBs and WAF can mitigate this by enforcing timeout behaviors.',
            distractorExplanation: 'Shield is volumetric.'
        },
        {
            id: 'q14',
            scenario: 'You need to update a fleet of Linux instances. You need to ensure the patch traffic does not traverse the internet.',
            options: ['VPC Endpoints for S3 (yum repo) and SSM.', 'NAT Gateway.', 'IGW.', 'Public Subnet.'],
            correctAnswer: 0,
            explanation: 'Amazon Linux repos are hosted in S3. Using a Gateway Endpoint for S3 and Interface Endpoint for SSM allows patching without internet.',
            distractorExplanation: 'NAT Gateway goes to internet.'
        },
        {
            id: 'q15',
            scenario: 'A company wants to store secrets. They need the ability to replicate the secret to multiple regions for DR.',
            options: ['Secrets Manager with Replication.', 'Parameter Store.', 'S3.', 'DynamoDB.'],
            correctAnswer: 0,
            explanation: 'Secrets Manager natively supports multi-region replication of secrets.',
            distractorExplanation: 'Parameter Store is regional (manual sync needed).'
        },
        {
            id: 'q16',
            scenario: 'You want to detect if an EC2 instance is communicating with a known botnet Command & Control server.',
            options: ['GuardDuty.', 'Inspector.', 'Macie.', 'Config.'],
            correctAnswer: 0,
            explanation: 'GuardDuty uses Threat Intelligence feeds to detect C&C communication.',
            distractorExplanation: 'Inspector checks software vulnerabilities.'
        },
        {
            id: 'q17',
            scenario: 'Which cryptographic algorithm does AWS KMS use for symmetric keys?',
            options: ['AES-256-GCM.', 'RSA.', 'ECC.', 'Blowfish.'],
            correctAnswer: 0,
            explanation: 'AES-256-GCM is the standard for KMS Symmetric keys.',
            distractorExplanation: 'RSA/ECC are Asymmetric.'
        },
        {
            id: 'q18',
            scenario: 'You need to decrypt a payload larger than 4KB using KMS.',
            options: ['Use Envelope Encryption (GenerateDataKey).', 'Send payload to KMS Decrypt.', 'Use S3.', 'Use DynamoDB.'],
            correctAnswer: 0,
            explanation: 'KMS direct `Encrypt/Decrypt` APIs have a 4KB limit. For larger data, you use KMS to generate a data key, and use that key locally to encrypt the data (Envelope Encryption).',
            distractorExplanation: 'Direct API fails >4KB.'
        },
        {
            id: 'q19',
            scenario: 'You want to restrict which encryption contexts can be used to decrypt a key.',
            options: ['Use KMS Key Policy Condition `kms:EncryptionContext:key`.', 'Use IAM.', 'Use S3.', 'Use Grants.'],
            correctAnswer: 0,
            explanation: 'Encryption Context is a critical security control (AAD). You can enforce it in the policy condition.',
            distractorExplanation: '.'
        },
        {
            id: 'q20',
            scenario: 'A Security Group allowing inbound 80.',
            options: ['Can be stateful.', 'Is stateful.', 'Is stateless.', 'Blocks return.'],
            correctAnswer: 1,
            explanation: 'SGs are stateful.',
            distractorExplanation: '.'
        }
    ]
};
