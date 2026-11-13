import assert from "node:assert/strict";
import test from "node:test";
import { getCatalog, getManual, languageMeta, manuals } from "../data/manuals.mjs";

test("catalog contains the expected multilingual products", () => {
  const catalog = getCatalog();
  assert.equal(catalog.length, 2);
  assert.deepEqual(
    catalog.map((product) => product.model),
    ["H5", "S6"]
  );
  assert.equal(catalog[0].languages.length, 6);
  assert.equal(catalog[1].languages.length, 4);
  assert.equal(catalog[0].docs, undefined);
});

test("every document has complete, non-empty content", () => {
  const ids = new Set();
  for (const product of manuals) {
    assert.ok(!ids.has(product.id), `Duplicate product id: ${product.id}`);
    ids.add(product.id);

    for (const [code, document] of Object.entries(product.docs)) {
      assert.ok(languageMeta[code], `Unknown language code: ${code}`);
      assert.ok(document.title.trim());
      assert.ok(document.summary.trim());
      assert.equal(document.sections.length, 5);
      for (const section of document.sections) {
        assert.ok(section.id);
        assert.ok(section.title.trim());
        assert.ok(section.body.length >= 1);
        assert.ok(section.body.every((paragraph) => paragraph.trim().length > 20));
      }
    }
  }
});

test("manual lookup returns only the requested language", () => {
  const manual = getManual("h5-hybrid", "en");
  assert.equal(manual.language.code, "en");
  assert.equal(manual.language.label, "English");
  assert.match(manual.title, /H5/);
  assert.equal(getManual("h5-hybrid", "xx"), null);
  assert.equal(getManual("missing", "en"), null);
});
