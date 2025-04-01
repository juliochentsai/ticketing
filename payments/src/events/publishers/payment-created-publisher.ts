import { Publisher, Subjects, PaymentCreatedEvent } from "@jc-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  

}
