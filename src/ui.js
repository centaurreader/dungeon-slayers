function uiNation(nation) {
  const nationTemplate = `<li class="nation">
<p class="nation_name">Nation Name</p>
<ul class="nation_cards">
    <li class="nation_card"></li>
    <li class="nation_card"></li>
    <li class="nation_card"></li>
</ul>
<ul class="nation_terrain">
    <li>
        <ul class="nation_terrain_row">
            <li class="nation_terrain_card"></li>
            <li class="nation_terrain_card"></li>
            <li class="nation_terrain_card"></li>
        </ul>
    </li>
</ul>
</li>
`;

  const tempContainer = document.createElement('ul');
  tempContainer.innerHTML = nationTemplate;
  return tempContainer.firstChild;
}

window.ui = {
  nation: uiNation,
};
