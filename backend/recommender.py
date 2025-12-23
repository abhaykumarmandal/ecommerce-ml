# backend/recommender.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from data import PRODUCTS

class RecommenderSystem:
    def __init__(self):
        self.df = pd.DataFrame(PRODUCTS)
        self._train_model()

    def _train_model(self):
        # Create a TF-IDF Vectorizer to convert text descriptions into vectors
        tfidf = TfidfVectorizer(stop_words='english')
        
        # Compute the TF-IDF matrix for product descriptions
        self.tfidf_matrix = tfidf.fit_transform(self.df['description'])
        
        # Compute Cosine Similarity matrix
        self.cosine_sim = linear_kernel(self.tfidf_matrix, self.tfidf_matrix)

    def get_recommendations(self, product_id, num_recommendations=3):
        # Get the index of the product that matches the product_id
        try:
            idx = self.df.index[self.df['id'] == product_id][0]
        except IndexError:
            return []

        # Get the pairwise similarity scores of all products with that product
        sim_scores = list(enumerate(self.cosine_sim[idx]))

        # Sort the products based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the most similar products (ignoring itself)
        sim_scores = sim_scores[1:num_recommendations+1]

        # Get the product indices
        product_indices = [i[0] for i in sim_scores]

        # Return the top most similar products
        return self.df.iloc[product_indices].to_dict('records')
