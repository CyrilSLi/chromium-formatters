// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';

import chromiumFormatter from '../dist/main.esm.js';

describe('FormatterWorker', () => {
  describe('format', () => {
    it('correctly formats Web app manifests', () => {
      const inputText = '{"name":"My Web App","start_url":"."}';
      const formattedText = `{
    "name": "My Web App",
    "start_url": "."
}`;
      assert.strictEqual(chromiumFormatter('application/manifest+json', inputText).content, formattedText);
    });
  });
});