import { Listener, OrderCreatedEvent, Subjects } from "@jc-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
// import { natsWrapper } from "../../nats-wrapper";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ricket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If not ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // ack the message
    msg.ack();
  }
}
