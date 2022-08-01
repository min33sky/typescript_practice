//? Overloads VS Generic

//* Overloads
function returnWhatIPassIn(input: string): string;
function returnWhatIPassIn(input: number): number;

function returnWhatIPassIn(input: unknown): unknown {
  return input;
}

const result1 = returnWhatIPassIn(12);
const result2 = returnWhatIPassIn('sdff');

//* Generic

function returnWhatIPassInGeneric<TInput>(input: TInput): TInput {
  return input;
}

const result3 = returnWhatIPassInGeneric<number>(12);
const result4 = returnWhatIPassInGeneric<string>('12');
