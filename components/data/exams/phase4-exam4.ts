
import { ExamDefinition } from './types';

export const PHASE_4_EXAM_4: ExamDefinition = {
    id: 'scs-c02-exam-4',
    title: 'AWS Security Specialty - Exam 4',
    code: 'SCS-C02',
    description: 'Data Protection, KMS Deep Dive & Security Engineering.',
    timeLimitMinutes: 60,
    passingScore: 750,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'You have a requirement to ensure that all S3 objects are encrypted. However, you also need to ensure that the encryption key is rotated every year. The rotation must happen automatically.',
            options: ['Use SSE-KMS with a Customer Managed Key (CMK) and enable Key Rotation.', 'Use SSE-S3.', 'Use SSE-KMS with an AWS Managed Key.', 'Use Client-Side Encryption.'],
            correctAnswer: 0,
            explanation: 'AWS Managed Keys rotate every 3 years (approx, not configurable). Customer Managed Keys (CMKs) can be configured to rotate every 1 year automatically. SSE-S3 keys are managed by AWS.',
            distractorExplanation: 'To meet the "Every Year" requirement, you need CMK with rotation enabled.'
        },
        {
            id: 'q2',
            scenario: 'A user accidentaly deleted a KMS key key material (Imported Key).',
            options: ['Re-import the same key material.', 'The data is lost forever.', 'Restore from Backup.', 'Call Support.'],
            correctAnswer: 0,
            explanation: 'If you use "Imported Key Material" (BYOK), you are responsible for durability. If you delete it (or it expires), you can re-import the *identical* key material to restore access.',
            distractorExplanation: 'Unlike AWS generated keys (which are unrecoverable if deleted), Imported Keys are recoverable IF you have the specific bytes.'
        },
        {
            id: 'q3',
            scenario: 'You need to investigate an S3 bucket for PII. You want to scan existing objects.',
            options: ['Macie Sensitive Data Discovery Job.', 'Macie Automated Discovery.', 'Inspector.', 'GuardDuty.'],
            correctAnswer: 0,
            explanation: 'Jobs scan existing batch. Automated Discovery samples continuously.',
            distractorExplanation: 'Inspector is EC2.'
        },
        {
            id: 'q4',
            scenario: 'You need to sign a Lambda deployment package to ensure code integrity.',
            options: ['AWS Signer.', 'KMS.', 'Certificate Manager.', 'IAM.'],
            correctAnswer: 0,
            explanation: 'AWS Signer is the code signing service.',
            distractorExplanation: '.'
        },
        {
            id: 'q5',
            scenario: 'You want to troubleshoot why a specific WAF rule is blocking traffic.',
            options: ['Enable WAF Logging (Full Logs) to CloudWatch/Kinesis.', 'Metric Filters.', 'Flow Logs.', 'CloudTrail.'],
            correctAnswer: 0,
            explanation: 'WAF Full Logs give you the details (RuleID, Payload, Action).',
            distractorExplanation: '.'
        },
        {
            id: 'q6',
            scenario: 'Which KMS Key Policy allows the account root user to control the key?',
            options: ['"Principal": { "AWS": "arn:aws:iam::111122223333:root" }, "Action": "kms:*".', 'Allow Everyone.', 'Allow User.', 'Allow Role.'],
            correctAnswer: 0,
            explanation: 'This is the standard "Delegate to IAM" statement. Without it, IAM policies in the account CANNOT control the key.',
            distractorExplanation: 'If you remove this, the key becomes unmanageable by IAM.'
        },
        {
            id: 'q7',
            scenario: 'You need to store a database password.',
            options: ['Secrets Manager.', 'Parameter Store (SecureString).', 'S3.', 'DynamoDB.'],
            correctAnswer: 0,
            explanation: 'Secrets Manager adds Rotation capability over Parameter Store.',
            distractorExplanation: 'SSM is good, but SM is "Best" for DB creds.'
        },
        {
            id: 'q8',
            scenario: 'You want to detect if an IAM User has Console access but no MFA.',
            options: ['Config Rule `iam-user-mfa-enabled`.', 'Trusted Advisor.', 'Inspector.', 'GuardDuty.'],
            correctAnswer: 0,
            explanation: 'Config Rule is the auditable mechanism.',
            distractorExplanation: '.'
        },
        {
            id: 'q9',
            scenario: 'A company needs to implement a WORM (Write Once Read Many) policy.',
            options: ['Object Lock.', 'Versioning.', 'MFA Delete.', 'Replication.'],
            correctAnswer: 0,
            explanation: 'Object Lock.',
            distractorExplanation: '.'
        },
        {
            id: 'q10',
            scenario: 'You need to manage SSH keys for EC2 fleet.',
            options: ['Systems Manager Session Manager.', 'OpsWorks.', 'Cognito.', 'Directory Service.'],
            correctAnswer: 0,
            explanation: 'Session Manager removes the need for SSH keys entirely.',
            distractorExplanation: '.'
        },
        {
            id: 'q11',
            scenario: 'Which service scans ECR images for vulnerabilities?',
            options: ['Amazon Inspector (or ECR Basic Scanning/Clair).', 'GuardDuty.', 'Macie.', 'Shield.'],
            correctAnswer: 0,
            explanation: 'Inspector (Enhanced Scanning) or Basic Scanning (Clair) scans container images.',
            distractorExplanation: '.'
        },
        {
            id: 'q12',
            scenario: 'You have a requirement to use a Hardware Security Module (HSM) that you manage.',
            options: ['CloudHSM.', 'KMS.', 'CloudFront.', 'S3.'],
            correctAnswer: 0,
            explanation: 'CloudHSM gives you single-tenant HSMs that you control.',
            distractorExplanation: 'KMS is shared (mostly).'
        },
        {
            id: 'q13',
            scenario: 'You want to prevent users from creating Security Groups that allow 0.0.0.0/0 on port 22.',
            options: ['Config Rule `vpc-sg-open-only-to-authorized-ports`.', 'SCP.', 'WAF.', 'Shield.'],
            correctAnswer: 0,
            explanation: 'Config rules detect this.',
            distractorExplanation: 'SCP can prevent creation if you know the exact JSON structure, but Config is the standard "Port Check" tool.'
        },
        {
            id: 'q14',
            scenario: 'You need to analyze S3 Access Logs.',
            options: ['Athena.', 'Quicksight.', 'Macie.', 'Inspector.'],
            correctAnswer: 0,
            explanation: 'Athena is the tool for querying Logs in S3.',
            distractorExplanation: '.'
        },
        {
            id: 'q15',
            scenario: 'A company wants to filter DNS queries.',
            options: ['Route 53 Resolver DNS Firewall.', 'WAF.', 'Network Firewall.', 'Security Groups.'],
            correctAnswer: 0,
            explanation: 'DNS Firewall filters domains.',
            distractorExplanation: 'Network Firewall does too, but DNS FW is specific to the R53 Resolver path.'
        },
        {
            id: 'q16',
            scenario: 'You need to protect API Gateway from DDoS.',
            options: ['WAF + Shield.', 'Security Groups.', 'NACL.', 'Inspector.'],
            correctAnswer: 0,
            explanation: 'WAF (Layer 7) and Shield (Layer 3/4).',
            distractorExplanation: '.'
        },
        {
            id: 'q17',
            scenario: 'How do you grant cross-account access to an SQS queue?',
            options: ['SQS Access Policy.', 'IAM.', 'Bucket Policy.', 'ACL.'],
            correctAnswer: 0,
            explanation: 'SQS has its own Resource Policy (Access Policy).',
            distractorExplanation: '.'
        },
        {
            id: 'q18',
            scenario: 'You need to debug a permission error `kms:Decrypt` access denied.',
            options: ['Check Key Policy AND IAM Policy.', 'Check Security Group.', 'Check NACL.', 'Check VPC Endpoint.'],
            correctAnswer: 0,
            explanation: 'KMS requires permission from both Identity and Resource (Key) policy layers in cross-account, or Key Policy delegate in same account.',
            distractorExplanation: '.'
        },
        {
            id: 'q19',
            scenario: 'You want to enforce MFA for a specific API call.',
            options: ['IAM Condition `aws:MultiFactorAuthPresent": "true"`.', 'SCP.', 'Config.', 'CloudTrail.'],
            correctAnswer: 0,
            explanation: 'Standard MFA enforcement pattern.',
            distractorExplanation: '.'
        },
        {
            id: 'q20',
            scenario: 'Which service manages the Root CA for your private internal PKI?',
            options: ['AWS Private CA.', 'ACM.', 'KMS.', 'CloudHSM.'],
            correctAnswer: 0,
            explanation: 'AWS Private CA (ACM PCA) allows you to run a private Certificate Authority.',
            distractorExplanation: 'ACM manages public/private certs, but PCA IS the CA.'
        }
    ]
};
