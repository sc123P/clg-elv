import { getPosts, getCountPostsByCategory } from "./posts.js";

export async function getPage(req, res, data, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const category_id = req.query.category_id;
  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  let posts;

  if (category_id) {
    try {
      // Compte le nombre total de posts pour la catégorie spécifiée
        getCountPostsByCategory(category_id, async (err, count) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors du comptage des publications par catégorie." });
        }

        // Utilise count pour obtenir le nombre total de posts par catégorie.
        const totalCount = count;

        // Récupére les posts spécifiques à la catégorie pour la pagination
        posts = await getCountPostsByCategory(category_id, startIndex, limit);

        // Calcul de la pagination pour les posts de la catégorie
        const results = {
          pageCount: Math.ceil(totalCount / limit),
          result: posts,
        };

        if (lastIndex < totalCount) {
          results.next = {
            page: page + 1,
          };
        }
        if (startIndex > 0) {
          results.prev = {
            page: page - 1,
          };
        }

        return res.json(results);
      });
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des publications." });
    }
  } else {
    // Récupère les posts pour la pagination sans catégorie

    posts = await getPosts(data);

    try {
      const results = {
        pageCount: Math.ceil(posts.length / limit),
        result: posts.slice(startIndex, lastIndex),
      };

      if (lastIndex < posts.length) {
          results.next = {
          page: page + 1,
        };
      }
      if (startIndex > 0) {
          results.prev = {
          page: page - 1,
        };
      }

      return res.json(results);
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite" });
    }
  }
}
