import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { NotificationsModule } from './notifications/notifications.module';
import { JobPostingsModule } from './job-postings/job-postings.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { CompanyModule } from './companies/company.module';
import { CandidateModule } from './candidates/candidate.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { InterviewsModule } from './interviews/interviews.module';
import { CandidatesModule } from './candidates/candidates.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { PositionsModule } from './positions/positions.module';
import { ResponsesModule } from './responses/responses.module';
import { QuestionsModule } from './questions/questions.module';
import { TemplatesModule } from './templates/templates.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        prismaOptions: {
          log: ['info', 'query'],
        },
        explicitConnect: false,
      }),
    }),
    UsersModule,
    NotificationsModule,
    JobPostingsModule,
    JobApplicationsModule,
    CompanyModule,
    CandidateModule,
    AuthModule,
    CompaniesModule,
    InterviewsModule,
    CandidatesModule,
    EvaluationsModule,
    PositionsModule,
    ResponsesModule,
    QuestionsModule,
    TemplatesModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
