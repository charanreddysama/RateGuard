export class RateGuardError
extends Error {

  constructor(message) {

    super(message);

    this.name =
      "RateGuardError";
  }
}