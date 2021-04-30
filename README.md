# Cloud Engineer Coding Test

## Problem

The objective is to simulate sending a large number of SMS alerts, like for an
emergency alert service. The simulation consists of three parts:

1.  A producer that generates a configurable number of messages (default 1000)
    to random phone number. Each message contains up to 100 random characters.
2.  A sender, who picks up messages from the producer and simulates sending
    messages by waiting a random period time distributed around a configurable
    mean. The sender also has a configurable failure rate.
3.  A progress monitor that displays the following and updates it every N
    seconds (configurable):

    -   Number of messages sent so far
    -   Number of messages failed so far
    -   Average time per message so far

One instance each for the producer and the progress monitor will be started
while a variable number of senders can be started with different mean
processing time and error rate settings.

You are free in the programming language you choose, but your code should come
with reasonable unit testing.

Please submit the code test at least two business days before the interview, so
we have time to review it.


## Proposed solution


### Suppositions

- It would be weird that all messages being sent to a single number, so this
  proposed solution will assume that each message is sent to a random number.

- Numbers will just be random 10-digits, but it's not important. We won't take
  into account the different SMS services (A2P 10 DLC: Application-to-person
  10-digit-long-code).

- Time will only count time since queueing. Tracking each step could be done but
  considered out-of-scope.

- For time saving in dev, all services will be HTTP with expressJS. Producer and
  progress monitor will only be simple console. Some services will be included
  as in-memory.


### Architecture of services

- Registry: This single instance service should only be used for discovery of
  available services. But for time saving, this will contain multiple services
  (but defined as in-memory variables instead of micro-services):

    - Queue: Faking a managed cue where the producer sends messages to. It also
      accepts subscriptions from senders. It will push events to each senders
      when new messages come in.

    - Log: Faking a service like logstash to gather events for later audit. This
      is not used by the monitor, but only shows it should be part of the
      solution.

    - DB: Keeping track of state of each message.

- Sender: This "zero or more" instance service will subscribe to the Queue (via
  registry). It will then wait for notifications (on a notif url) and then make
  the pulling of new message to send.


## Usage


### Installation

    npm ci


### Build

    npm run build


### Testing

Testing is ran during `npm run build`.

We can run all the test suite with: `npm test`.

If you are in development, you can also run `npm run test:watch` for tests to
run every time a file is saved.


### Execution

Each should be run in a different terminal. This would somewhat simulate the
distributed nature of the services. They are using the same code base, but we
can assume they are in their own micro-service setup.

The env variables indicates the default values.

`DEBUG=SMS:*` can be defined to run in debug mode.


#### Registry

    REGISTRY_PORT=9000 npm run registry

This registry will act like if it was a Queue, but also database and log server.
In reality, we would want to send logs to another service.


### Sender

    REGISTRY_URL=http://localhost:9000/registry SENDER_DELAY=250 SENDER_FAILURE_RATE=5 npm run sender

- `SENDER_DELAY` is in millis. This will just be used as a delay to simulate
sending of each SMS.
- `SENDER_FAILURE_RATE` is a % value.

Since this is designed as a managed queue, the sender is not directly comparable
to services like AWS SNS or Twilio (which do not subscribe to a topic). It just
offers a distributed environment that could then call those services to do the
actual sending (simulated by the `SENDER_DELAY`).


### Monitor

    REGISTRY_URL=http://localhost:9000/registry MONITOR_REFRESH_DELAY=5 npm run monitor

`MONITOR_REFRESH_DELAY` is the number of seconds between calls.


### Producer

    REGISTRY_URL=http://localhost:9000/registry NUMBER_OF_MESSAGES_TO_SEND=1000 npm run producer

This will just connect to the registry and send the number of messages.
