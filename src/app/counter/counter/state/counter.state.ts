export interface Counterstate {
   counter: number;
   channelName: string;
}


export const initialState: Counterstate = {
   counter: 0,
   channelName: 'Web Dev'
};