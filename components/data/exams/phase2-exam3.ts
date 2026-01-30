
import { ExamDefinition } from './types';

export const PHASE_2_EXAM_3: ExamDefinition = {
    id: 'saa-c03-exam-3',
    title: 'AWS Solutions Architect Associate - Exam 3',
    code: 'SAA-C03',
    description: 'Serverless, Data Analytics, and Advanced Storage Patterns.',
    timeLimitMinutes: 45,
    passingScore: 720,
    totalQuestions: 20,
    questions: [
        {
            id: 'q1',
            scenario: 'A company wants to run a serverless workflow that orchestrates multiple Lambda functions, waits for manual approval, and handles retry logic. Which service is BEST?',
            options: ['AWS Step Functions', 'Amazon SWF', 'AWS Lambda chaining', 'Amazon SQS'],
            correctAnswer: 0,
            explanation: 'AWS Step Functions is a serverless orchestration service designed to manage workflows (state machines) of multiple steps, including manual approvals and error handling.',
            distractorExplanation: 'SWF is legacy. Lambda chaining (A triggers B) is a bad pattern (tight coupling, no visibility). SQS is choreography, not orchestration.'
        },
        {
            id: 'q2',
            scenario: 'You are ingesting real-time clickstream data. You need to load this data into Amazon Redshift for analytics. You want a fully managed solution that automatically scales and handles the loading.',
            options: ['Kinesis Data Streams with a custom consumer', 'Kinesis Data Firehose', 'AWS Glue', 'AWS Data Pipeline'],
            correctAnswer: 1,
            explanation: 'Kinesis Data Firehose is the easiest way to load streaming data into data stores (S3, Redshift, Elasticsearch). It is fully managed and auto-scaling.',
            distractorExplanation: 'Data Streams requires a consumer to write to Redshift. Glue is batch.'
        },
        {
            id: 'q3',
            scenario: 'A company processes images uploaded to S3. They want to trigger a Lambda function immediately after an upload. However, sometimes the function fails. They want to ensure failed events are retried and effectively managed.',
            options: ['Configure S3 to publish to SQS, then trigger Lambda from SQS', 'Configure S3 to trigger Lambda directly', 'Use CloudTrail events', 'Use EventBridge'],
            correctAnswer: 0,
            explanation: 'Triggering Lambda from SQS (S3 -> SQS -> Lambda) provides a buffer and better control over retries and Dead Letter Queues (DLQs) for failed events, increasing reliability.',
            distractorExplanation: 'Direct S3 trigger invokes Lambda asynchronously; while it has internal retries, managing the failure (DLQ) is easier with standard Queue patterns for critical workflows.'
        },
        {
            id: 'q4',
            scenario: 'You have an NFS file system on-premises. You want to migrate it to AWS but keep the same NFS structure. It will be accessed by Linux instances.',
            options: ['Amazon S3', 'Amazon EFS', 'Amazon EBS', 'Amazon FSx for Lustre'],
            correctAnswer: 1,
            explanation: 'EFS is the AWS managed NFS file system for Linux.',
            distractorExplanation: 'S3 is object. EBS is block. Lustre is for high performance compute (HPC).'
        },
        {
            id: 'q5',
            scenario: 'Which storage option allows an EC2 instance to have high-performance, temporary block storage that persists only for the lifetime of the instance?',
            options: ['EBS General Purpose', 'Instance Store', 'EFS', 'S3'],
            correctAnswer: 1,
            explanation: 'Instance Store is physically attached to the host server. It provides very high IOPS but data is lost if the instance is stopped or terminated.',
            distractorExplanation: 'EBS persists. EFS persists.'
        },
        {
            id: 'q6',
            scenario: 'A company wants to query log data stored in S3 using SQL. They do not want to provision servers.',
            options: ['Amazon Redshift Spectrum', 'Amazon Athena', 'Amazon EMR', 'Amazon RDS'],
            correctAnswer: 1,
            explanation: 'Athena is serverless SQL for S3.',
            distractorExplanation: 'Redshift Spectrum requires a Redshift cluster. EMR is a cluster.'
        },
        {
            id: 'q7',
            scenario: 'You need to coordinate a distributed application. Message A must be processed before Message B. Which queue type?',
            options: ['SQS Standard Queue', 'SQS FIFO Queue', 'SNS Topic', 'Kinesis Shard'],
            correctAnswer: 1,
            explanation: 'FIFO Queues guarantee order.',
            distractorExplanation: 'Standard queues do not guarantee order.'
        },
        {
            id: 'q8',
            scenario: 'A company needs to store key-value data with single-digit millisecond latency. The workload is spiky. They want to pay only for the requests made, not provision capacity.',
            options: ['DynamoDB Provisioned Capacity', 'DynamoDB On-Demand', 'RDS', 'Aurora Serverless'],
            correctAnswer: 1,
            explanation: 'DynamoDB On-Demand Mode charges per request and handles spikes automatically without provisioning.',
            distractorExplanation: 'Provisioned requires planning. RDS is slower.'
        },
        {
            id: 'q9',
            scenario: 'Which service allows you to decouple the components of a microservices application?',
            options: ['EC2', 'SQS', 'IAM', 'CloudFormation'],
            correctAnswer: 1,
            explanation: 'SQS (and SNS) are the primary services for decoupling applications.',
            distractorExplanation: 'Others are compute/security/management.'
        },
        {
            id: 'q10',
            scenario: 'You have a high-performance computing (HPC) workload that requires high network throughput and low latency between instances.',
            options: ['Cluster Placement Group', 'Spread Placement Group', 'Partition Placement Group', 'Auto Scaling Group'],
            correctAnswer: 0,
            explanation: 'Cluster Placement Groups pack instances close together physically (same rack/AZ) for max network performance.',
            distractorExplanation: 'Spread separates them (for FA). Partition is for Hadoop/Kafka.'
        },
        {
            id: 'q11',
            scenario: 'A company holds 500 TB of loose files. They want to migrate to S3 but need to modify the files (transcoding) on the fly during the migration.',
            options: ['DataSync', 'Snowball Edge', 'Storage Gateway', 'Transfer Family'],
            correctAnswer: 1,
            explanation: 'Snowball Edge Compute Optimized devices can run EC2/Lambda allowing you to process (transcode) data locally before shipping it back to AWS.',
            distractorExplanation: 'DataSync just copies. Storage Gateway just bridges.'
        },
        {
            id: 'q12',
            scenario: 'Which database engine allows you to run a graph database?',
            options: ['DynamoDB', 'Neptune', 'Aurora', 'ElastiCache'],
            correctAnswer: 1,
            explanation: 'Amazon Neptune is a managed graph database.',
            distractorExplanation: 'DynamoDB is KV. Aurora is Relational.'
        },
        {
            id: 'q13',
            scenario: 'You need to expose a text-based search capability for your website\'s product catalog.',
            options: ['Amazon OpenSearch Service (Elasticsearch)', 'DynamoDB', 'S3 Select', 'Athena'],
            correctAnswer: 0,
            explanation: 'OpenSearch (formerly Elasticsearch) is a dedicated search engine.',
            distractorExplanation: 'DynamoDB scan is inefficient for text search.'
        },
        {
            id: 'q14',
            scenario: 'A company wants to host a static website in an S3 bucket only reachable via CloudFront. They want to prevent direct access to the S3 bucket.',
            options: ['Origin Access Control (OAC) / OAI', 'Bucket Policy allowing Public', 'VPC Endpoint', 'Signed URLs'],
            correctAnswer: 0,
            explanation: 'Using OAC (or legacy OAI), you configure the S3 Bucket Policy to only allow access from the CloudFront Principal.',
            distractorExplanation: 'Public policy defeats the purpose.'
        },
        {
            id: 'q15',
            scenario: 'Which service can act as a firewall for your API Gateway?',
            options: ['Security Groups', 'AWS WAF', 'NACL', 'Shield'],
            correctAnswer: 1,
            explanation: 'You can attach AWS WAF directly to API Gateway to filter traffic.',
            distractorExplanation: 'Security Groups do not attach to API Gateway (public endpoint). NACL is for VPC.'
        },
        {
            id: 'q16',
            scenario: 'A company wants to quickly deploy a Java application. They want AWS to handle the deployment details (capacity provisioning, load balancing, auto-scaling, and health monitoring) but want control over the underlying resources if needed.',
            options: ['AWS Elastic Beanstalk', 'AWS Lambda', 'AWS CloudFormation', 'EC2'],
            correctAnswer: 0,
            explanation: 'Elastic Beanstalk offers a PaaS-like experience for deploying apps while still giving access to the EC2 instances.',
            distractorExplanation: 'CloudFormation is code. Lambda is no-ops (no control over underlying). EC2 is manual.'
        },
        {
            id: 'q17',
            scenario: 'You need to run a Docker container task once a day. The job lasts 5 minutes.',
            options: ['ECS Service', 'ECS Task on Fargate', 'EC2 Instance', 'Kubernetes'],
            correctAnswer: 1,
            explanation: 'Running a standalone ECS Task (on Fargate) is perfect for batch jobs. You don\'t need a Service (which maintains long-running listeners).',
            distractorExplanation: 'Service keeps it running. EC2 is waste.'
        },
        {
            id: 'q18',
            scenario: 'Which protocol does Kinesis Data Streams use to allow multiple consumers to read the same stream in parallel with high throughput?',
            options: ['Enhanced Fan-Out', 'Standard Consumer', 'Long Polling', 'Multiplexing'],
            correctAnswer: 0,
            explanation: 'Enhanced Fan-Out gives each consumer its own read throughput (2MB/s) via HTTP/2 push, preventing contention.',
            distractorExplanation: 'Standard consumer shares the 2MB/s limit.'
        },
        {
            id: 'q19',
            scenario: 'A company wants to use a machine learning model to detect anomalies in their industrial sensors. They have no ML experience.',
            options: ['SageMaker', 'Amazon Lookout for Equipment', 'TensorFlow on EC2', 'DeepRacer'],
            correctAnswer: 1,
            explanation: 'Amazon Lookout for Equipment is an AI service specifically for industrial anomaly detection (no ML expertise needed).',
            distractorExplanation: 'SageMaker requires data science skills.'
        },
        {
            id: 'q20',
            scenario: 'What is the most secure way for an EC2 instance to access a DynamoDB table?',
            options: ['IAM User keys in code', 'IAM Role attached to EC2', 'VPC Endpoint', 'Security Group'],
            correctAnswer: 1,
            explanation: 'Always use Roles for compute permissions.',
            distractorExplanation: 'VPC endpoint is for network path, not permission/auth.'
        }
    ]
};
