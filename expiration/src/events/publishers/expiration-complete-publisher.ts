import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@jc-tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
