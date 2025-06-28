<?php
$items = [
    ["title" => "Карточка 1", "description" => "Описание карточки 1"],
    ["title" => "Карточка 2", "description" => "Описание карточки 2"],
    ["title" => "Карточка 3", "description" => "Описание карточки 3"]
];
?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <title>Карточки на PHP</title>
    <style>
        .card {
            border: 1px solid #ccc;
            padding: 16px;
            margin: 8px;
            border-radius: 8px;
        }

        .card-title {
            font-weight: bold;
            font-size: 18px;
        }

        .card-desc {
            margin-top: 8px;
        }
    </style>
</head>

<body>
    <h1>Карточки (PHP)</h1>
    <div id="cards">
        <?php foreach ($items as $item): ?>
            <div class="card">
                <div class="card-title"><?= htmlspecialchars($item['title']) ?></div>
                <div class="card-desc"><?= htmlspecialchars($item['description']) ?></div>
            </div>
        <?php endforeach; ?>
    </div>

    <script>
        function renderCards(items) {
            const container = document.getElementById('cards');
            items.forEach(({ title, description }) => {
                const card = createCard(title, description);
                container.appendChild(card);
            });
        }

        function createCard(title, description) {
            const card = document.createElement('div');
            card.className = 'card';
            const title = document.createElement('div');
            title.className = 'card-title';
            title.textContent = title;
            const desc = document.createElement('div');
            desc.className = 'card-desc';
            desc.textContent = description;
            card.appendChild(title);
            card.appendChild(desc);

            return card;
        }
    </script>
</body>

</html>