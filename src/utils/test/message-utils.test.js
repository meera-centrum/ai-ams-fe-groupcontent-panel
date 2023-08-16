import { describe, expect, test } from '@jest/globals';
import { isMessageText, isMessagePlot, isMessageTableList, isMessageError } from '../../components/message-utils';

const textMessage = 'Request failed with status code 401';
const tableMessage =
  '<TableList data="W3siTGVhdmVEYXlzIjoxLCJSZWFzb24iOiJEYXkgb2ZmLCBGYW1pbHkgVHJpcCJ9LHsiTGVhdmVEYXlzIjoxLCJSZWFzb24iOiJQRE8gVHJhaW5pbmcgU2Vzc2lvbiAxIn0seyJMZWF2ZURheXMiOjIsIlJlYXNvbiI6IlBETyBUYWthbXVsIFRyYWluaW5nIn1d" />';
const plotMessage =
  '<PlotlyPlot script="Y29uc3QgZGF0YSA9IG9yaWdpbmFsRGF0YTsKCi8vIGJlZ2luCgpjb25zdCB4VmFsdWVzID0gZGF0YS5tYXAoZCA9PiBkLkRlcGFydG1lbnROYW1lKTsKY29uc3QgeVZhbHVlcyA9IGRhdGEubWFwKGQgPT4gZC5FbXBsb3llZUlkKTsKCmNvbnN0IHRyYWNlID0gewogIHg6IHhWYWx1ZXMsCiAgeTogeVZhbHVlcywKICB0eXBlOiAnYmFyJwp9OwoKY29uc3QgbGF5b3V0ID0gewogIHRpdGxlOiAnRW1wbG95ZWVzIGJ5IERlcGFydG1lbnQnLAogIHhheGlzOiB7CiAgICB0aXRsZTogJ0RlcGFydG1lbnQnCiAgfSwKICB5YXhpczogewogICAgdGl0bGU6ICdFbXBsb3llZSBJRCcKICB9Cn07CgpQbG90bHkucmVhY3Qobm9kZSwgW3RyYWNlXSwgbGF5b3V0KTsKCi8vIGVuZA==" query="U0VMRUNUIFRfRGVwYXJ0bWVudC5EZXBhcnRtZW50TmFtZSwgVF9FbXBsb3llZUdlbmVyYWxJbmZvLkVtcGxveWVlSWQsIFRfRW1wbG95ZWVEZXRhaWxzLkZpcnN0TmFtZSwgVF9FbXBsb3llZURldGFpbHMuTGFzdE5hbWUKRlJPTSBUX0RlcGFydG1lbnQKSU5ORVIgSk9JTiBUX0VtcGxveWVlR2VuZXJhbEluZm8gT04gVF9EZXBhcnRtZW50LkRlcGFydG1lbnRJZCA9IFRfRW1wbG95ZWVHZW5lcmFsSW5mby5EZXBhcnRtZW50SWQKSU5ORVIgSk9JTiBUX0VtcGxveWVlRGV0YWlscyBPTiBUX0VtcGxveWVlR2VuZXJhbEluZm8uRW1wbG95ZWVJZCA9IFRfRW1wbG95ZWVEZXRhaWxzLkVtcGxveWVlSWQKR1JPVVAgQlkgVF9EZXBhcnRtZW50LkRlcGFydG1lbnROYW1lLCBUX0VtcGxveWVlR2VuZXJhbEluZm8uRW1wbG95ZWVJZCwgVF9FbXBsb3llZURldGFpbHMuRmlyc3ROYW1lLCBUX0VtcGxveWVlRGV0YWlscy5MYXN0TmFtZQpPUkRFUiBCWSBUX0RlcGFydG1lbnQuRGVwYXJ0bWVudE5hbWU7" />';
const errorMessage =
  '<Error description="U3VyZSEgSSB3b3JrIGJ5IHVzaW5nIGEgY29tYmluYXRpb24gb2YgbmF0dXJhbCBsYW5ndWFnZSBwcm9jZXNzaW5nIChOTFApIGFuZCBkYXRhYmFzZSBxdWVyeWluZyB0ZWNobmlxdWVzIHRvIGFuc3dlciBxdWVzdGlvbnMgcmVsYXRlZCB0byBIUiBkYXRhLgoKSGVyZSdzIGEgc3RlcC1ieS1zdGVwIGV4cGxhbmF0aW9uIG9mIGhvdyBJIHdvcms6CgoxLiBJIGFuYWx5emUgdGhlIHF1ZXN0aW9uIHRvIGlkZW50aWZ5IHRoZSBrZXkgY29uY2VwdHMsIGVudGl0aWVzLCBhbmQgcmVsYXRpb25zaGlwcyBpbnZvbHZlZC4KMi4gSSB1c2UgTkxQIHRlY2huaXF1ZXMgdG8gZXh0cmFjdCB0aGUgcmVsZXZhbnQgaW5mb3JtYXRpb24gZnJvbSB0aGUgcXVlc3Rpb24sIHN1Y2ggYXMgdGhlIHRhYmxlIGFuZCBjb2x1bW4gbmFtZXMsIGRhdGEgdHlwZXMsIGFuZCByZWxhdGlvbnNoaXBzLgozLiBJIGdlbmVyYXRlIGEgU1FMIHF1ZXJ5IGJhc2VkIG9uIHRoZSBleHRyYWN0ZWQgaW5mb3JtYXRpb24sIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBzeW50YXggYW5kIGRhdGEgdHlwZXMuCjQuIEkgZXhlY3V0ZSB0aGUgU1FMIHF1ZXJ5IG9uIHRoZSBkYXRhYmFzZSB0byByZXRyaWV2ZSB0aGUgcmVxdWVzdGVkIGRhdGEuCjUuIEkgZm9ybWF0IHRoZSByZXRyaWV2ZWQgZGF0YSBpbnRvIGEgY29uY2lzZSBhbmQgcmVhZGFibGUgZm9ybWF0LCBzdWNoIGFzIGEgdGFibGUgb3IgbGlzdC4KNi4gSSBwcm92aWRlIHRoZSBmb3JtYXR0ZWQgZGF0YSBhcyB0aGUgYW5zd2VyIHRvIHRoZSBxdWVzdGlvbi4KClRocm91Z2hvdXQgdGhpcyBwcm9jZXNzLCBJIGVuc3VyZSB0aGF0IHRoZSBTUUwgcXVlcnkgaXMgYWNjdXJhdGUsIGVmZmljaWVudCwgYW5kIGZvbGxvd3MgYmVzdCBwcmFjdGljZXMgZm9yIGRhdGFiYXNlIHF1ZXJ5aW5nLiBJIGFsc28gaGFuZGxlIGFueSBlcnJvcnMgb3IgZXhjZXB0aW9ucyB0aGF0IG1heSBvY2N1ciBkdXJpbmcgdGhlIHF1ZXJ5IGV4ZWN1dGlvbiBhbmQgcHJvdmlkZSBpbmZvcm1hdGl2ZSBtZXNzYWdlcyB0byB0aGUgdXNlci4=" error="" />';
//
describe('message utils test', () => {
  test('is message text', () => {
    expect(isMessageText(textMessage)).toBe(true);
  });
  test('is message text', () => {
    expect(isMessageText(tableMessage)).toBe(false);
  });

  test('is message text', () => {
    expect(isMessageText(plotMessage)).toBe(false);
  });
  test('is message text', () => {
    expect(isMessageText(errorMessage)).toBe(false);
  });
  //
  test('is message plot', () => {
    expect(isMessagePlot(plotMessage)).toBe(true);
  });
  test('is message plot', () => {
    expect(isMessagePlot(textMessage)).toBe(false);
  });
  //
  test('is message table list', () => {
    expect(isMessageTableList(tableMessage)).toBe(true);
  });
  test('is message table list', () => {
    expect(isMessageTableList(plotMessage)).toBe(false);
  });
  //
  test('is message error', () => {
    expect(isMessageError(errorMessage)).toBe(true);
  });
  test('is message error', () => {
    expect(isMessageError(textMessage)).toBe(false);
  });
});
