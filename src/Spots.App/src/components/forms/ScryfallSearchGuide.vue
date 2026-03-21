<template>
  <div class="search-guide">
    <p class="search-guide-intro">
      Scryfall supports a powerful query language. Here are some common filters to get you started.
    </p>

    <section class="guide-section">
      <h3 class="section-title">Colour</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Filter</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>c:</code></td>
            <td><code>c:red</code></td>
            <td>Cards that are red</td>
          </tr>
          <tr>
            <td><code>c:</code></td>
            <td><code>c:wu</code></td>
            <td>White and blue (multicolour)</td>
          </tr>
          <tr>
            <td><code>c:</code></td>
            <td><code>c:m</code></td>
            <td>Multicolour cards</td>
          </tr>
          <tr>
            <td><code>c:</code></td>
            <td><code>c:c</code></td>
            <td>Colourless cards</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h3 class="section-title">Card Type</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Filter</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>t:</code></td>
            <td><code>t:creature</code></td>
            <td>Creatures</td>
          </tr>
          <tr>
            <td><code>t:</code></td>
            <td><code>t:instant</code></td>
            <td>Instants</td>
          </tr>
          <tr>
            <td><code>t:</code></td>
            <td><code>t:legendary</code></td>
            <td>Legendary permanents</td>
          </tr>
          <tr>
            <td><code>t:</code></td>
            <td><code>t:planeswalker</code></td>
            <td>Planeswalkers</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h3 class="section-title">Rarity</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Filter</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>r:</code></td>
            <td><code>r:mythic</code></td>
            <td>Mythic rare cards</td>
          </tr>
          <tr>
            <td><code>r:</code></td>
            <td><code>r:rare</code></td>
            <td>Rare cards</td>
          </tr>
          <tr>
            <td><code>r:</code></td>
            <td><code>r:uncommon</code></td>
            <td>Uncommon cards</td>
          </tr>
          <tr>
            <td><code>r:</code></td>
            <td><code>r:common</code></td>
            <td>Common cards</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h3 class="section-title">Set</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Filter</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>set:</code></td>
            <td><code>set:blb</code></td>
            <td>Cards from Bloomburrow</td>
          </tr>
          <tr>
            <td><code>set:</code></td>
            <td><code>set:mh2</code></td>
            <td>Cards from Modern Horizons 2</td>
          </tr>
          <tr>
            <td><code>e:</code></td>
            <td><code>e:ltr</code></td>
            <td>Alias for <code>set:</code></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h3 class="section-title">Special Properties</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Filter</th>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>is:</code></td>
            <td><code>is:foil</code></td>
            <td>Foil printings</td>
          </tr>
          <tr>
            <td><code>is:</code></td>
            <td><code>is:promo</code></td>
            <td>Promo cards</td>
          </tr>
          <tr>
            <td><code>is:</code></td>
            <td><code>is:commander</code></td>
            <td>Legal in Commander</td>
          </tr>
          <tr>
            <td><code>lang:</code></td>
            <td><code>lang:en</code></td>
            <td>English printings only</td>
          </tr>
          <tr>
            <td><code>artist:</code></td>
            <td><code>artist:terese-nielsen</code></td>
            <td>Cards by an artist</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="guide-section">
      <h3 class="section-title">Combining Filters</h3>
      <table class="guide-table">
        <thead>
          <tr>
            <th>Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>t:creature c:green r:rare</code></td>
            <td>Rare green creatures</td>
          </tr>
          <tr>
            <td><code>lightning bolt</code></td>
            <td>Search by card name</td>
          </tr>
          <tr>
            <td><code>set:blb r:mythic</code></td>
            <td>Mythics from Bloomburrow</td>
          </tr>
          <tr>
            <td><code>c:blue t:instant</code></td>
            <td>Blue instants</td>
          </tr>
        </tbody>
      </table>
    </section>

    <p class="search-guide-footer">
      Full documentation at
      <a href="https://scryfall.com/docs/syntax" target="_blank" rel="noopener noreferrer" class="guide-link">
        scryfall.com/docs/syntax
      </a>
    </p>
  </div>
</template>

<style scoped>
.search-guide {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-guide-intro {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.guide-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.guide-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.guide-table th {
  text-align: left;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.guide-table td {
  padding: 7px 10px;
  color: var(--text-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  vertical-align: top;
}

.guide-table tr:last-child td {
  border-bottom: none;
}

.guide-table code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  background: rgba(155, 77, 202, 0.12);
  color: var(--accent);
  padding: 2px 5px;
  border-radius: 3px;
}

.search-guide-footer {
  font-size: 12px;
  color: var(--text-secondary);
  padding-top: 4px;
}

.guide-link {
  color: var(--accent);
  text-decoration: none;
}

.guide-link:hover {
  text-decoration: underline;
}
</style>
