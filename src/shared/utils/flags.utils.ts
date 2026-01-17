export class FlagsUtils {
  public static IsFlagSet(value: number, flag: number): boolean {
    return (value & flag) === flag;
  }

  public static AddFlag(value: number, flag: number): number {
    return (value |= flag);
  }
}
