
import { ExamDefinition } from './types';

export const PHASE_1_EXAM_4: ExamDefinition = {
    id: 'clf-c02-exam-4',
    title: 'AWS Cloud Practitioner - Exam 4',
    code: 'CLF-C02',
    description: 'General Practice Exam covering all domains. High Difficulty.',
    timeLimitMinutes: 30,
    passingScore: 700,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'You need to share a specific file in an S3 bucket with a user for 10 minutes only. You do not want to change the bucket policy. What should you generate?',
            options: ['IAM Role', 'S3 Presigned URL', 'CloudFront Signed Cookie', 'Bucket ACL'],
            correctAnswer: 1,
            explanation: 'S3 Presigned URLs allow you to grant temporary access to a specific object without modifying permissions.',
            distractorExplanation: 'Signed Cookies are for multiple files. ACL is legacy.'
        },
        {
            id: 'q2',
            scenario: 'Which service allows you to send text messages (SMS) to users worldwide?',
            options: ['SQS', 'SNS', 'SES', 'Connect'],
            correctAnswer: 1,
            explanation: 'SNS supports "Application to Person" (A2P) functionality including SMS.',
            distractorExplanation: 'SES is for email. SQS is queues. Connect is contact center.'
        },
        {
            id: 'q3',
            scenario: 'Which pillar of the Well-Architected Framework focuses on recovery from failure?',
            options: ['Reliability', 'Performance Efficiency', 'Security', 'Operational Excellence'],
            correctAnswer: 0,
            explanation: 'The Reliability pillar focuses on workload recovery and mitigating disruptions.',
            distractorExplanation: 'Security is protection. Ops is running systems. Performance is resources.'
        },
        {
            id: 'q4',
            scenario: 'You want to deploy an SSL/TLS certificate to your Load Balancer. Which service manages this?',
            options: ['AWS KMS', 'AWS Certificate Manager (ACM)', 'IAM', 'Secrets Manager'],
            correctAnswer: 1,
            explanation: 'ACM provisions, manages, and deploys public and private SSL/TLS certificates.',
            distractorExplanation: 'KMS is for encryption keys. IAM is for users.'
        },
        {
            id: 'q5',
            scenario: 'What is the most cost-effective purchasing option for EC2 if you have a steady state workload for 3 years?',
            options: ['On-Demand', 'Spot', 'Savings Plans (Components)', 'Dedicated Host'],
            correctAnswer: 2,
            explanation: 'Compute Savings Plans (or EC2 Instance Savings Plans) offer up to 72% savings for 1 or 3 year commitment.',
            distractorExplanation: 'Spot is for interruptible. On-Demand is synonymous with variable, not steady.'
        },
        {
            id: 'q6',
            scenario: 'Which service tracks resource inventory and configuration history?',
            options: ['CloudTrail', 'Config', 'Systems Manager', 'Trusted Advisor'],
            correctAnswer: 1,
            explanation: 'AWS Config records configuration changes to your AWS resources.',
            distractorExplanation: 'Trail records API calls, not state changes.'
        },
        {
            id: 'q7',
            scenario: 'A company wants to host a Domain Name System (DNS) zone in AWS.',
            options: ['Route 53', 'CloudFront', 'VPC', 'Direct Connect'],
            correctAnswer: 0,
            explanation: 'Amazon Route 53 is a highly available and scalable cloud DNS web service.',
            distractorExplanation: 'CloudFront is CDN. VPC is network.'
        },
        {
            id: 'q8',
            scenario: 'Which compute service allows you to access the underlying operating system?',
            options: ['Lambda', 'Fargate', 'EC2', 'S3'],
            correctAnswer: 2,
            explanation: 'EC2 provides full control over the OS (Root/Admin access).',
            distractorExplanation: 'Lambda and Fargate abstract the OS.'
        },
        {
            id: 'q9',
            scenario: 'You need to automate code deployment to EC2 instances, on-premises instances, and Lambda functions.',
            options: ['AWS CodeBuild', 'AWS CodeCommit', 'AWS CodeDeploy', 'AWS CodePipeline'],
            correctAnswer: 2,
            explanation: 'AWS CodeDeploy automates code deployments to any instance, including EC2 and on-prem.',
            distractorExplanation: 'CodeBuild compiles code. CodeCommit hosts Git. Pipeline orchestrates.'
        },
        {
            id: 'q10',
            scenario: 'Which service allows you to create a logically isolated section of the AWS Cloud?',
            options: ['Placement Groups', 'VPC', 'Availability Zone', 'Edge Location'],
            correctAnswer: 1,
            explanation: 'A Virtual Private Cloud (VPC) is a logically isolated virtual network.',
            distractorExplanation: 'AZ is physical. Edge is caching.'
        },
        {
            id: 'q11',
            scenario: 'Which pricing tool provides a graphical visualization of your daily and monthly costs?',
            options: ['Cost Explorer', 'Pricing Calculator', 'Budgets', 'Consolidated Billing'],
            correctAnswer: 0,
            explanation: 'AWS Cost Explorer provides graphs and charts to visualize spending.',
            distractorExplanation: 'Calculator is for estimates. Budgets is for alerts.'
        },
        {
            id: 'q12',
            scenario: 'A company needs to transfer 50 PB of data to AWS. Bandwidth is limited.',
            options: ['Direct Connect', 'S3 Transfer Acceleration', 'Snowmobile', 'Snowball Edge'],
            correctAnswer: 2,
            explanation: 'AWS Snowmobile is an Exabyte-scale data transfer service (shipping a truck). 50PB > Snowball limits.',
            distractorExplanation: 'Snowball is ~80TB. Direct Connect would take too long.'
        },
        {
            id: 'q13',
            scenario: 'Which service provides threat detection for your AWS account?',
            options: ['Inspector', 'GuardDuty', 'Shield', 'WAF'],
            correctAnswer: 1,
            explanation: 'GuardDuty uses ML to detect anomalies and threats (crypto mining, unauthorized access).',
            distractorExplanation: 'Inspector scans for vulnerabilities.'
        },
        {
            id: 'q14',
            scenario: 'You want to store data in a column-oriented fashion for fast analytics queries.',
            options: ['RDS', 'DynamoDB', 'Redshift', 'ElastiCache'],
            correctAnswer: 2,
            explanation: 'Amazon Redshift uses columnar storage for high-performance analytics (OLAP).',
            distractorExplanation: 'RDS is row-oriented (OLTP).'
        },
        {
            id: 'q15',
            scenario: 'Which service allows you to run a script to install software when an EC2 instance launches?',
            options: ['User Data', 'Metadata', 'EBS Snapshot', 'AMI'],
            correctAnswer: 0,
            explanation: 'EC2 User Data is passed to the instance at launch and can run scripts.',
            distractorExplanation: 'Metadata provides info about the instance.'
        },
        {
            id: 'q16',
            scenario: 'Which service is a managed DDoS protection service?',
            options: ['AWS Shield', 'WAF', 'Inspector', 'Security Hub'],
            correctAnswer: 0,
            explanation: 'AWS Shield is specifically for DDoS protection.',
            distractorExplanation: 'WAF is for exploits.'
        },
        {
            id: 'q17',
            scenario: 'Who controls the private keys for EC2 key pairs?',
            options: ['AWS', 'The Customer', 'Shared', 'Auditor'],
            correctAnswer: 1,
            explanation: 'The Customer possesses the private key. AWS does not store it after creation.',
            distractorExplanation: 'If you lose it, it is gone.'
        },
        {
            id: 'q18',
            scenario: 'Which service allows you to aggregate logs from multiple accounts?',
            options: ['CloudWatch Logs', 'CloudTrail', 'Config', 'Athena'],
            correctAnswer: 0,
            explanation: 'CloudWatch Logs can be configured with a destination to aggregate logs centrally.',
            distractorExplanation: 'Trail logs API calls but Logs handles app logs.'
        },
        {
            id: 'q19',
            scenario: 'What is the main benefit of Decoupling?',
            options: ['Reduced latency', 'Tighter integration', 'Fault tolerance', 'Lower cost'],
            correctAnswer: 2,
            explanation: 'Decoupling ensures that if one component fails, the others can continue to work (e.g., via queue), improving fault tolerance.',
            distractorExplanation: 'It often increases latency slightly.'
        },
        {
            id: 'q20',
            scenario: 'Which database is compatible with MongoDB?',
            options: ['DynamoDB', 'DocumentDB', 'Neptune', 'Redshift'],
            correctAnswer: 1,
            explanation: 'Amazon DocumentDB is a highly scalable, fast, fully managed document database service that supports MongoDB workloads.',
            distractorExplanation: 'DynamoDB is proprietary NoSQL.'
        }
    ]
};
